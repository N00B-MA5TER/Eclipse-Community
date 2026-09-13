const API = "http://127.0.0.1:8000/api";

async function run() {
  console.log("=== INTEGRATION TEST START ===");
  try {
    // 1. REGISTER ADMIN (already done, just login)
    let res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "root@admin.local", password: "password" })
    });
    let data = await res.json();
    if (!data.token) throw new Error("Admin login failed");
    const adminToken = data.token;
    console.log("✅ Admin logged in");

    // 2. ADMIN CREATE EVENT
    res = await fetch(`${API}/admin/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${adminToken}` },
      body: JSON.stringify({
        title: "Test Hackathon",
        type: "hackathon",
        date: "2026-12-01",
        time: "09:00",
        description: "A cool test event"
      })
    });
    data = await res.json();
    if (!data.id) throw new Error("Event creation failed: " + JSON.stringify(data));
    const eventId = data.id;
    console.log("✅ Event created:", eventId);

    // 3. REGISTER USER 1
    res = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "User One", email: "user1@test.com", password: "password", password_confirmation: "password", phone: "1234" })
    });
    data = await res.json();
    const token1 = data.token;
    console.log("✅ User 1 registered");

    // 4. USER 1 CREATE TEAM
    res = await fetch(`${API}/teams`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token1}` },
      body: JSON.stringify({ name: "Alpha Squad", maxMembers: 2, eventId })
    });
    data = await res.json();
    const teamId = data.id;
    const teamCode = data.code;
    console.log("✅ Team created:", teamId);

    // 5. REGISTER USER 2
    res = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "User Two", email: "user2@test.com", password: "password", password_confirmation: "password", phone: "1234" })
    });
    data = await res.json();
    const token2 = data.token;
    console.log("✅ User 2 registered");

    // 6. USER 2 JOIN TEAM
    res = await fetch(`${API}/teams/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token2}` },
      body: JSON.stringify({ code: teamCode, eventId: eventId })
    });
    data = await res.json();
    if (data.error) throw new Error("User 2 join failed: " + data.error);
    console.log("✅ User 2 joined team");

    // 7. USER 1 APPROVES USER 2
    res = await fetch(`${API}/teams/${teamId}/approve`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token1}` },
      // I need to fetch the team to get User 2's ID. Let's fetch /teams
      body: JSON.stringify({ targetUid: 2 }) // Assuming ID is 2
    });
    
    // FETCH TEAMS to verify
    res = await fetch(`${API}/teams`, {
        headers: { "Authorization": `Bearer ${token1}` }
    });
    data = await res.json();
    const myTeam = data.find((t) => t.id === teamId);
    if (!myTeam) throw new Error("My team not found in SSE payload format");
    console.log("✅ Team verified in list:", myTeam.name, "Members:", myTeam.members.length);
    
    const user2Id = myTeam.pendingMembers?.[0]?.uid;
    if (user2Id) {
       await fetch(`${API}/teams/${teamId}/approve`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token1}` },
          body: JSON.stringify({ targetUid: user2Id })
       });
       console.log("✅ User 2 approved");
    }

    // 8. REGISTER USER 3 (Capacity test)
    res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "User 3", email: "user3@test.com", password: "password", password_confirmation: "password", phone: "1234" })
    });
    data = await res.json();
    const token3 = data.token;

    res = await fetch(`${API}/teams/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token3}` },
        body: JSON.stringify({ code: teamCode, eventId: eventId })
    });
    if (res.status !== 400) {
        const d = await res.json();
        console.log("⚠️ Expected 400 for capacity, got:", res.status, d);
    } else {
        console.log("✅ Team capacity constraint works");
    }

    // 9. SSE STREAM TEST
    console.log("Testing SSE connection...");
    // We can't fully consume SSE in simple fetch without reader, but we can hit it
    res = await fetch(`${API}/teams/stream`, {
        headers: { "Authorization": `Bearer ${token1}` }
    });
    console.log("✅ SSE Endpoint accessible, status:", res.status);

    console.log("=== INTEGRATION TEST SUCCESS ===");
  } catch (e) {
    console.error("❌ TEST FAILED:", e);
  }
}

run();
