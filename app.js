const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const hostname = process.env.HOST_MACHINE_NAME || 'Unknown';

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
      padding: 2px;
    }
    </style>

    <h2>Welcome to Fortinet Demo Site</h2>
    <h3>Hostname: ${hostname}</h3>

    <img src="https://flagpedia.net/data/flags/normal/${data.countryCode.toLowerCase()}.png" style="width: 10%;">
    <div style="height: 20px;"></div> <!-- Added space before the table -->

    <table><tr><td colspan="2">
      Country:</td><td>${data.country}<br>
      Country Code:</td><td>${data.countryCode}<br>
      Region:</td><td>${data.region}<br>
      Region Name:</td><td>${data.regionName}<br>
      City:</td><td>${data.city}<br>
      Zip:</td><td>${data.zip}<br>
      Timezone:</td><td>${data.timezone}<br>
      ISP:</td><td>${data.isp}<br>
      Organization:</td><td>${data.org}<br>
      IP:</td><td>${data.query}
      </td></tr></table>

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
