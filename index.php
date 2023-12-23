<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="style.css">
</head>

<body>
    <div class="container mt-4 max-width-container">
        <div class="d-flex justify-content-between align-items-center">
            <h2>Welcome to Fortinet Demo Site</h2>
            <img id="flag" src="" style="width: 10%;">
        </div>

        <div style="height: 20px;"></div>

        <table class="table table-striped" id="data-table">
            <!-- Table Content will be populated by JavaScript -->
        </table>

        <div style="height: 20px;"></div>

        <!-- Bootstrap Buttons -->
        <a href="app1.html" class="btn btn-primary mr-1">App1</a>
        <a href="app2.html" class="btn btn-success mr-1">App2</a>
        <a href="phpinfo.php" class="btn btn-info mr-1">PHP Info</a>
        <a href="bank.html" class="btn btn-warning mr-1">Bank Application</a>
        <a href="headers.html" class="btn btn-info">HTTP Request Headers</a>

        <footer class="my-5 pt-5 text-muted text-center text-small">
            <p class="mb-1">&copy; 2024 Fortinet Demo</p>
        </footer>

    </div>

    <!-- Bootstrap JS (optional) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

    <script>
        async function fetchAndDisplayData() {
            try {
                const response = await fetch('http://ip-api.com/json');
                const data = await response.json();

                // Update flag image
                document.getElementById('flag').src = `https://flagpedia.net/data/flags/normal/${data.countryCode.toLowerCase()}.png`;

                // Construct table content with fetched data
                const tableContent = `
                    <tr><th>Attribute</th><th>Value</th></tr>
                    <tr><td>Hostname</td><td><?php echo getenv('HOST_MACHINE_NAME') ?: 'N/A'; ?></td></tr>
                    <tr><td>IP</td><td>${data.query}</td></tr>
                    <tr><td>Country</td><td>${data.country}</td></tr>
                    <tr><td>Country Code</td><td>${data.countryCode}</td></tr>
                    <tr><td>Region</td><td>${data.region}</td></tr>
                    <tr><td>Region Name</td><td>${data.regionName}</td></tr>
                    <tr><td>City</td><td>${data.city}</td></tr>
                    <tr><td>Zip</td><td>${data.zip}</td></tr>
                    <tr><td>Timezone</td><td>${data.timezone}</td></tr>
                    <tr><td>ISP</td><td>${data.isp}</td></tr>
                    <tr><td>Organization</td><td>${data.org}</td></tr>
                `;

                document.getElementById('data-table').innerHTML = tableContent;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchAndDisplayData();
    </script>
</body>

</html>