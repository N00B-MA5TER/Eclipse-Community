const http = require('http');
const fs = require('fs');
const path = require('path');

// Create a dummy image
const dummyImagePath = path.join(__dirname, 'dummy.jpg');
fs.writeFileSync(dummyImagePath, Buffer.from('dummy image data'));

const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
let data = '';
data += '--' + boundary + '\r\n';
data += 'Content-Disposition: form-data; name="photo"; filename="dummy.jpg"\r\n';
data += 'Content-Type: image/jpeg\r\n\r\n';
data += fs.readFileSync(dummyImagePath).toString('binary') + '\r\n';
data += '--' + boundary + '\r\n';
data += 'Content-Disposition: form-data; name="name"\r\n\r\n';
data += 'John Doe\r\n';
data += '--' + boundary + '\r\n';
data += 'Content-Disposition: form-data; name="department"\r\n\r\n';
data += 'CS\r\n';
data += '--' + boundary + '\r\n';
data += 'Content-Disposition: form-data; name="graduation_year"\r\n\r\n';
data += '2023\r\n';
data += '--' + boundary + '\r\n';
data += 'Content-Disposition: form-data; name="current_role"\r\n\r\n';
data += 'Developer\r\n';
data += '--' + boundary + '--\r\n';

const options = {
  hostname: '127.0.0.1',
  port: 8080,
  path: '/api/alumni',
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=' + boundary,
    'Accept': 'application/json',
    'Content-Length': Buffer.byteLength(data, 'binary')
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  let body = '';
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    body += chunk;
  });
  res.on('end', () => {
    console.log(`BODY: ${body}`);
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(data, 'binary');
req.end();
