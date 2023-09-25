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

    <div class="container"> <!-- Bootstrap container to add space on the left and right -->
      <h2>Welcome to Fortinet Demo Site</h2>

      <img src="https://flagpedia.net/data/flags/normal/${data.countryCode.toLowerCase()}.png" style="width: 10%;">
      <div style="height: 20px;"></div>

      <style>
        /* Override Bootstrap styles */
        table {
          width: auto;  /* Set width to auto */
          margin: auto; /* Center the table */
          font-family: arial, sans-serif;
          border-collapse: collapse;
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

      <table>
        <!-- Table content here -->
      </table>

      <div style="height: 20px;"></div>

      <!-- Bootstrap Buttons -->
      <a href="/app1" class="btn btn-primary">App1</a>
      <a href="/app2" class="btn btn-success">App2</a>
    </div> <!-- End of Bootstrap container -->

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
