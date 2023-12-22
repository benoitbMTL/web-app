const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const hostname = process.env.HOST_MACHINE_NAME || 'Unknown';

// Serve static files from the "public" directory
app.use(express.static('public'));

// Main homepage
app.get('/', async (req, res) => {
  const { data } = await axios.get('http://ip-api.com/json');

  // Capture the headers
  let headersHTML = '';
  Object.entries(req.headers).forEach(([key, value]) => {
    headersHTML += `<tr><td>${key}</td><td>${value}</td></tr>`;
  });

  res.send(`
      <!-- Bootstrap CSS -->
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

      <div class="container mt-4"> <!-- Added top margin (mt-4) -->
        <div class="d-flex justify-content-between align-items-center"> <!-- Flexbox container -->
          <h2>Welcome to Fortinet Demo Site</h2> <!-- Title -->
          <img src="https://flagpedia.net/data/flags/normal/${data.countryCode.toLowerCase()}.png" style="width: 10%;">
        </div>

      <div style="height: 20px;"></div>

      <table class="table table-striped"> <!-- Added Bootstrap table classes -->
      <tr>
      <th>Attribute</th>
      <th>Value</th>
      </tr>
      <tr>
      <td>Hostname</td>
      <td>${hostname}</td>
      </tr>
      <tr>
      <td>IP</td>
      <td>${data.query}</td>
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
      //${headersHTML}
      </table>

      <div style="height: 20px;"></div>

      <!-- Bootstrap Buttons -->
      <a href="/app1" class="btn btn-primary">App1</a>
      <a href="/app2" class="btn btn-success">App2</a>
      <a href="/phpinfo" class="btn btn-info">PHP Info</a>
      <a href="/bank" class="btn btn-warning">Bank Application</a>
      </div> <!-- End of Bootstrap container -->

      <!-- Bootstrap JS (optional) -->
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  `);
});

// App1 page
app.get('/app1', (req, res) => {
  res.send(`
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <body style="background-color: lightgray;">
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-auto">
            <div class="bg-primary text-white rounded p-3">
              <h2>Welcome to App1</h2>
            </div>
          </div>
        </div>
      </div>
    </body>
  `);
});

// App2 page
app.get('/app2', (req, res) => {
  res.send(`
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <body style="background-color: lightgray;">
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-auto">
            <div class="bg-success text-white rounded p-3">
              <h2>Welcome to App2</h2>
            </div>
          </div>
        </div>
      </div>
    </body>
  `);
});

// PHP Info page
app.get('/phpinfo', (req, res) => {
  res.send('<?php phpinfo( ); ?>');
});

// Bank Application page
app.get('/bank', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'bank.html'));
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});
