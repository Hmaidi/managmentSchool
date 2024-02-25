const http = require('http');
const jwt = require('jsonwebtoken');
const secretKey = 'secret_key';
// Create a server
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specific HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
  res.setHeader('Content-Type', 'application/json');
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  // Set the response Content-Type

  if (req.url === '/api/login' && req.method === 'POST') {
    // Set JSON content type and send JSON response
    const token = generateToken({ username: 'test' ,password:'test'});
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({'username':'test', 'password':'test','token': token}));
  }
  else {
    // Return 404 for all other routes
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found');
  }
});

// Define the port the server will listen on
const port = 3000;

// Start the server, and have it listen on the defined port
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
function generateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
}
