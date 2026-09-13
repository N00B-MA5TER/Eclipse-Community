const crypto = require('crypto');

const token = "6aa4f5b98f8a0beebc0554e8|wpl4fnOBEPzZZoW6yEWBc7jaoGA1IV57qdrMAZatbcd77d32";
const headers = { 
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
};
const baseUrl = 'http://127.0.0.1:8080/api';

async function testConcurrentWrites() {
    console.log("Testing concurrent team creations...");
    const reqs = [];
    // We will fire 10 concurrent create team requests
    for (let i = 0; i < 10; i++) {
        const teamName = `QA_Load_Team_${crypto.randomBytes(4).toString('hex')}`;
        reqs.push(
            fetch(`${baseUrl}/teams`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    name: teamName,
                    eventId: '6aa4eb278f8a0beebc0554a9',
                    maxMembers: 4
                })
            }).then(async res => ({ status: res.status, data: await res.json() }))
        );
    }
    
    const results = await Promise.all(reqs);
    let success = 0;
    let failed = 0;
    let alreadyInTeam = 0;
    
    results.forEach(res => {
        if (res.status === 201) success++;
        else if (res.status === 400 && res.data.error && res.data.error.includes('already in a team')) alreadyInTeam++;
        else {
            failed++;
            console.log(`Failed request: ${res.status} =>`, res.data);
        }
    });
    
    console.log(`Concurrent Writes Result:`);
    console.log(`Successful creations: ${success}`);
    console.log(`Prevented by 'already in team' rule: ${alreadyInTeam}`);
    console.log(`Other failures: ${failed}`);
    
    // In our app, one user can only be in one team per event.
    // So if we send 10 concurrent requests for the SAME user, exactly 1 should succeed, and 9 should fail!
    if (success === 1 && alreadyInTeam === 9) {
        console.log("RACE CONDITION PREVENTED SUCCESSFULLY!");
    } else {
        console.log("RACE CONDITION VULNERABILITY DETECTED!");
    }
}

testConcurrentWrites().catch(console.error);
