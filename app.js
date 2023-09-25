const express = require('express');
const axios = require('axios');
const app = express();
const os = require('os');
const port = 3000;
const hostname = os.hostname();  // Add this line

// Main homepage
app.get('/', async (req, res) => {
  const { data } = await axios.get('http://ip-api.com/json');
  res.send(`

    <style>
    table {
      border: 1px solid black;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
      border-collapse: collapse;
    }
    td {
      padding: 10px;
    }
    </style>

    <h2>Welcome to Fortinet Demo Site</h2>
    <h3>Hostname: ${hostname}</h3>

    <img src="https://flagpedia.net/data/flags/normal/${data.countryCode.toLowerCase()}.png" style="width: 10%;">
    <div style="height: 20px;"></div> <!-- Added space before the table -->

    <table>
      <tr><td>Country:</td><td>${data.country}</td></tr>
      <tr><td>Country Code:</td><td>${data.countryCode}</td></tr>
      <tr><td>Region:</td><td>${data.region}</td></tr>
      <tr><td>Region Name:</td><td>${data.regionName}</td></tr>
      <tr><td>City:</td><td>${data.city}</td></tr>
      <tr><td>Zip:</td><td>${data.zip}</td></tr>
      <tr><td>Timezone:</td><td>${data.timezone}</td></tr>
      <tr><td>ISP:</td><td>${data.isp}</td></tr>
      <tr><td>Organization:</td><td>${data.org}</td></tr>
      <tr><td>IP:</td><td>${data.query}</td></tr>
    </table>

    <div style="height: 20px;"></div> <!-- Added space before the table -->
    <a href="/app1"><button style="background-color: blue; color: white;">App1</button></a>
    <a href="/app2"><button style="background-color: green; color: white;">App2</button></a>
  `);
});

// App1 page
app.get('/app1', (req, res) => {
  res.send('<body style="background-color: blue;"><h2>Welcome to App1</h2></body>');
});

// App2 page
app.get('/app2', (req, res) => {
  res.send('<body style="background-color: green;"><h2>Welcome to App2</h2></body>');
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});
