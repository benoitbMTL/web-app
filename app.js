const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const hostname = process.env.HOST_MACHINE_NAME || 'Unknown';

// Main homepage
app.get('/', async (req, res) => {
  const { data } = await axios.get('http://ip-api.com/json');
  res.send(`

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">


  <style>
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }
  </style>

  <h2>Welcome to Fortinet Demo Site</h2>
  #<h3>Hostname: ${hostname}</h3>

  <img src="https://flagpedia.net/data/flags/normal/${data.countryCode.toLowerCase()}.png" style="width: 10%;">
  <div style="height: 20px;"></div> <!-- Added space before the table -->

<table>
  <tr>
    <th>Attribute</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>Country</td>
    <td>${data.country}</td>
  </tr>
  <tr>
    <td>Country Code</td>
    <td>${data.countryCode}</td>
  </tr>
  <tr>
    <td>Region</td>
    <td>${data.region}</td>
  </tr>
  <tr>
    <td>Region Name</td>
    <td>${data.regionName}</td>
  </tr>
  <tr>
    <td>City</td>
    <td>${data.city}</td>
  </tr>
  <tr>
    <td>Zip</td>
    <td>${data.zip}</td>
  </tr>
  <tr>
    <td>Timezone</td>
    <td>${data.timezone}</td>
  </tr>
  <tr>
    <td>ISP</td>
    <td>${data.isp}</td>
  </tr>
  <tr>
    <td>Organization</td>
    <td>${data.org}</td>
  </tr>
  <tr>
    <td>IP</td>
    <td>${data.query}</td>
  </tr>
</table>

    <!-- Bootstrap Buttons -->
    <a href="/app1" class="btn btn-primary">App1</a>
    <a href="/app2" class="btn btn-success">App2</a>

    <!-- Bootstrap JS (optional) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

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
