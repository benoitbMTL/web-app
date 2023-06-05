const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    const { data } = await axios.get('http://ip-api.com/json');

    res.send(`
    <h2>Welcome to web.livedemo.ca</h2>
    <img src="https://flagpedia.net/data/flags/normal/${data.countryCode.toLowerCase()}.png" style="width: 15%;">
    <div style="height: 20px;"></div> <!-- Added space before the table -->
    <table style="border: 1px solid black; box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); border-collapse: collapse;">
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
  `);
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});
