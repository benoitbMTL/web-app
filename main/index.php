<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="style.css">
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item"><a href="app1.html" class="btn btn-primary mr-1 nav-link">App1</a></li>
                    <li class="nav-item"><a href="app2.html" class="btn btn-success mr-1 nav-link">App2</a></li>
                    <li class="nav-item"><a href="phpinfo.php" class="btn btn-info mr-1 nav-link">PHP Info</a></li>
                    <li class="nav-item"><a href="headers.php" class="btn btn-info nav-link">HTTP Headers</a></li>
                    <li class="nav-item"><a href="bank.html" class="btn btn-warning mr-1 nav-link">Bank</a></li>
                    <li class="nav-item"><a href="upload.php" class="btn btn-warning mr-1 nav-link">File Upload</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container mt-4 max-width-container" style="padding-top: 75px;">
        <div class="d-flex justify-content-between align-items-center">
            <h3>Welcome to the Fortinet Demo App</h3>
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
            <tr><td>Timezone</td><td><?php echo $data->timezone; ?></td></tr>
            <tr><td>ISP</td><td><?php echo $data->isp; ?></td></tr>
            <tr><td>Organization</td><td><?php echo $data->org; ?></td></tr>
            <tr><td>AS</td><td><?php echo $data->as; ?></td></tr>
        </table>

        <footer class="my-5 pt-5 text-muted text-center text-small">
            <p class="mb-1">&copy; 2024 Fortinet Demo</p>
        </footer>
    </div>

    <!-- Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>
