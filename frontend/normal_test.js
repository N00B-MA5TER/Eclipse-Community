const token = "6aa4f5b98f8a0beebc0554e8|wpl4fnOBEPzZZoW6yEWBc7jaoGA1IV57qdrMAZatbcd77d32";
const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
const baseUrl = 'http://127.0.0.1:8080/api';
const eventId = '6aa4eb278f8a0beebc0554a9';
let teamId = null;

async function testNormalFlow() {
    console.log("1. Create team normally");
    const r1 = await fetch(`${baseUrl}/teams`, {method:'POST', headers, body: JSON.stringify({name: "Normal Flow Team", eventId, maxMembers: 4})});
    console.log("Create status:", r1.status);
    if (r1.status === 201) {
        const t = await r1.json();
        teamId = t.id;
        console.log("Success! Team created.");
    }

    console.log("2. Attempt to create another team");
    const r2 = await fetch(`${baseUrl}/teams`, {method:'POST', headers, body: JSON.stringify({name: "Another Team", eventId, maxMembers: 4})});
    console.log("Second create status:", r2.status);
    
    console.log("3. Leave team as leader (should delete if empty or fail/reassign)");
    const r3 = await fetch(`${baseUrl}/teams/${teamId}/leave`, {method:'POST', headers});
    console.log("Leave status:", r3.status);

    console.log("4. Delete team as leader");
    // Team might be deleted already by leave if empty
    const r4 = await fetch(`${baseUrl}/teams/${teamId}`, {method:'DELETE', headers});
    console.log("Delete status:", r4.status);
    
    console.log("ALL DONE");
}

testNormalFlow().catch(console.error);
