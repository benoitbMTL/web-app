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
            <!-- PHP will update the flag image -->
            <?php
                $json_url = "http://ip-api.com/json";
                $json = file_get_contents($json_url);
                $data = json_decode($json);
                $flag_url = "https://flagcdn.com/w320/" . strtolower($data->countryCode) . ".png";
            ?>
            <img id="flag" src="<?php echo $flag_url; ?>" style="width: 20%;">
        </div>

        <div style="height: 20px;"></div>

        <table class="table table-striped" id="data-table">
            <!-- Table Content populated by PHP -->
            <tr><th>Attribute</th><th>Value</th></tr>
            <tr><td>Hostname</td><td><?php echo getenv('HOST_MACHINE_NAME') ?: 'N/A'; ?></td></tr>
            <tr><td>Public IP</td><td><?php echo $data->query; ?></td></tr>
            <tr><td>Country</td><td><?php echo $data->country; ?></td></tr>
            <tr><td>Country Code</td><td><?php echo $data->countryCode; ?></td></tr>
            <tr><td>Region</td><td><?php echo $data->region; ?></td></tr>
            <tr><td>Region Name</td><td><?php echo $data->regionName; ?></td></tr>
            <tr><td>City</td><td><?php echo $data->city; ?></td></tr>
            <tr><td>Zip</td><td><?php echo $data->zip; ?></td></tr>
            <tr><td>Latitude</td><td><?php echo $data->lat; ?></td></tr>
            <tr><td>Longitude</td><td><?php echo $data->lon; ?></td></tr>
            <tr><td>Timezone</td><td><?php echo $data->timezone; ?></td></tr>
            <tr><td>ISP</td><td><?php echo $data->isp; ?></td></tr>
            <tr><td>Organization</td><td><?php echo $data->org; ?></td></tr>
            <tr><td>AS</td><td><?php echo $data->as; ?></td></tr>
        </table>

        <div style="height: 20px;"></div>

        <!-- Bootstrap Buttons -->
        <a href="app1.html" class="btn btn-primary mr-1">App1</a>
        <a href="app2.html" class="btn btn-success mr-1">App2</a>
        <a href="phpinfo.php" class="btn btn-info mr-1">PHP Info</a>
        <a href="bank.html" class="btn btn-warning mr-1">Bank Application</a>
        <a href="headers.php" class="btn btn-info">HTTP Headers</a>

        <footer class="my-5 pt-5 text-muted text-center text-small">
            <p class="mb-1">&copy; 2024 Fortinet Demo</p>
        </footer>
    </div>

    <!-- Bootstrap JS (optional) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>

</html>