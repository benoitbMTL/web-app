const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const exec = require('child_process').exec;
const port = 3000;
const hostname = process.env.HOST_MACHINE_NAME || 'Unknown';

// Serve static files from the "public" directory
app.use(express.static('public'));

// Main homepage
app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// App1 page
app.get('/app1', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'app1.html'));
});

// App2 page
app.get('/app2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'app2.html'));
});

// PHP Info page
app.get('/phpinfo', (req, res) => {
  exec('php -r "phpinfo();"', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send('Server Error');
    }
    res.send(`<pre>${stdout}</pre>`);
  });
});


// Bank Application page
app.get('/bank', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'bank.html'));
});

// HTTP Request Headers page
app.get('/headers', (req, res) => {
  let headersHTML = '';
  Object.entries(req.headers).forEach(([key, value]) => {
    headersHTML += `<tr><td>${key}</td><td>${value}</td></tr>`;
  });
  res.sendFile(path.join(__dirname, 'public', 'headers.html'));
});

app.get('/api/data', async (req, res) => {
  const { data } = await axios.get('http://ip-api.com/json');
  res.json({ hostname: hostname, ipData: data });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});
