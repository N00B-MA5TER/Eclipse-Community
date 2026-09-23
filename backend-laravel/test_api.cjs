const http = require('http');

const data = JSON.stringify({
  name: 'Test Name',
  department: 'Test Department',
  graduation_year: 2024,
  current_role: 'Test Role'
});

const options = {
  hostname: '127.0.0.1',
  port: 8080,
  path: '/api/alumni',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
