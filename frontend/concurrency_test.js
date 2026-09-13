const crypto = require('crypto');

const token = "6aa4f5b98f8a0beebc0554e8|wpl4fnOBEPzZZoW6yEWBc7jaoGA1IV57qdrMAZatbcd77d32";
const headers = { 
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
};
const baseUrl = 'http://127.0.0.1:8080/api';
// We use a known event id, the one we used previously: 6aa4eb278f8a0beebc0554a9
const eventId = '6aa4eb278f8a0beebc0554a9';

async function cleanupTeams() {
    console.log("Cleaning up previous test teams...");
    const res = await fetch(`${baseUrl}/teams`, {headers});
    const teams = await res.json();
    const testTeams = teams.filter(t => t.name.startsWith('QA_Load_Team_'));
    await Promise.all(testTeams.map(t => fetch(`${baseUrl}/teams/${t.id}`, {method:'DELETE', headers})));
    console.log(`Cleaned up ${testTeams.length} test teams.`);
}

async function runTest(concurrency) {
    console.log(`\n================================`);
    console.log(`Running concurrency test with ${concurrency} requests`);
    console.log(`================================`);
    
    // We create a single unique name for this burst to simulate exact identical requests
    const teamName = `QA_Load_Team_${crypto.randomBytes(4).toString('hex')}`;
    
    const reqs = [];
    for (let i = 0; i < concurrency; i++) {
        reqs.push(
            fetch(`${baseUrl}/teams`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    name: teamName,
                    eventId: eventId,
                    maxMembers: 4
                })
            }).then(async res => ({ status: res.status, data: await res.json() }))
        );
    }
    
    const results = await Promise.all(reqs);
    let success = 0;
    let failed = 0;
    let conflicts = 0;
    let tooManyReqs = 0;
    
    results.forEach(res => {
        if (res.status === 201) success++;
        else if (res.status === 409) {
            conflicts++;
            console.log("409: ", res.data);
        }
        else if (res.status === 429) {
            tooManyReqs++;
            console.log("429: ", res.data);
        }
        else {
            failed++;
            console.log(`Unexpected failure: ${res.status} =>`, res.data);
        }
    });
    
    console.log(`HTTP Results:`);
    console.log(`  201 Created: ${success}`);
    console.log(`  409 Conflict / 429 RateLimit: ${conflicts + tooManyReqs}`);
    console.log(`  Other Failures: ${failed}`);
    
    // Verify DB
    const res = await fetch(`${baseUrl}/teams`, {headers});
    const teams = await res.json();
    const createdTeams = teams.filter(t => t.name === teamName);
    console.log(`Teams created in DB for this burst: ${createdTeams.length}`);
    
    if (success === 1 && createdTeams.length === 1) {
        console.log("✅ TEST PASSED");
    } else {
        console.log("❌ TEST FAILED");
    }
    
    // Clean up this specific team so next burst can run fresh
    await Promise.all(createdTeams.map(t => fetch(`${baseUrl}/teams/${t.id}`, {method:'DELETE', headers})));
}

async function main() {
    await cleanupTeams();
    await runTest(10);
    await runTest(20);
    await runTest(50);
}

main().catch(console.error);
