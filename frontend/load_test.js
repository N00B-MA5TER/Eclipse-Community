const autocannon = require('autocannon');

const token = "6aa4f5b98f8a0beebc0554e8|wpl4fnOBEPzZZoW6yEWBc7jaoGA1IV57qdrMAZatbcd77d32"; // Used from the QA test logs

async function runTest(url, title) {
    console.log(`\nStarting Load Test for ${title}...`);
    
    for (const concurrency of [10, 30, 50]) {
        console.log(`\nConcurrency: ${concurrency}`);
        const result = await autocannon({
            url: url,
            connections: concurrency,
            duration: 10,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        console.log(`Req/Sec: ${result.requests.average}`);
        console.log(`Latency p50: ${result.latency.p50} ms`);
        console.log(`Latency p95: ${result.latency.p95} ms`);
        console.log(`Latency p99: ${result.latency.p99} ms`);
        console.log(`2xx: ${result.non2xx === 0 ? result.requests.total : result.requests.total - result.non2xx}`);
        console.log(`4xx/5xx: ${result.non2xx}`);
        console.log(`Timeouts: ${result.timeouts}`);
        
        if (result.non2xx > 0) {
            console.log(`WARNING: Non-2xx responses detected!`);
        }
    }
}

async function main() {
    await runTest('http://127.0.0.1:8080/api/events', '/api/events');
    await runTest('http://127.0.0.1:8080/api/teams', '/api/teams');
    await runTest('http://127.0.0.1:8080/api/notifications', '/api/notifications');
    await runTest('http://127.0.0.1:8080/api/auth/me', '/api/auth/me');
}

main().catch(console.error);
