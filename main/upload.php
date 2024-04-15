<?php
$target_dir = "uploads/";
$uploadOk = 1;

// Ensure the uploads directory exists
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['deleteFiles'])) {
        // Delete all files in the directory
        $files = glob($target_dir . '/*');
        foreach ($files as $file) {
            if (is_file($file)) {
                unlink($file);
            }
        }
        echo "<div class='alert alert-success' role='alert'>All files have been deleted.</div>";
    } elseif (isset($_FILES["fileToUpload"])) {
        if ($_FILES["fileToUpload"]["error"] != 0) {
            echo "<div class='alert alert-danger' role='alert'>No file was uploaded or there was an upload error. Error code: " . $_FILES["fileToUpload"]["error"] . "</div>";
        } else {
            $target_file = $target_dir . '/' . basename($_FILES["fileToUpload"]["name"]);

            // Check if file already exists
            if (file_exists($target_file)) {
                echo "<div class='alert alert-warning' role='alert'>Sorry, file already exists.</div>";
                $uploadOk = 0;
            }

            // If $uploadOk is set to 0 by an error
            if ($uploadOk == 0) {
                echo "<div class='alert alert-danger' role='alert'>Sorry, your file was not uploaded.</div>";
            } else {
                // If everything is ok, try to upload file
                if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
                    echo "<div class='alert alert-success' role='alert'>The file " . htmlspecialchars(basename($_FILES["fileToUpload"]["name"])) . " has been uploaded.</div>";
                } else {
                    echo "<div class='alert alert-danger' role='alert'>Sorry, there was an error uploading your file.</div>";
                }
            }
        }
    }
}

// Function to list files in the uploads directory
function listUploads($dir) {
    $files = scandir($dir);
    echo "<div class='card'><div class='card-body'><h5 class='card-title'>Uploaded Files</h5><ul class='list-group'>";
    foreach ($files as $file) {
        if ($file != "." && $file != "..") {
            echo "<li class='list-group-item'><a href='" . htmlspecialchars($dir) . "/" . htmlspecialchars($file) . "' target='_blank'>" . htmlspecialchars($file) . "</a></li>";
        }
    }
    echo "</ul></div></div>";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>File Upload Form</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
    <div class="container mt-5">
        <h1 class="mb-3">File Upload Form</h1>
        <form action="upload.php" method="post" enctype="multipart/form-data" class="mb-3">
            <div class="mb-3">
                <label for="fileToUpload" class="form-label">Select file to upload:</label>
                <input type="file" class="form-control" name="fileToUpload" id="fileToUpload">
            </div>
            <button type="submit" class="btn btn-primary btn-sm">Upload File</button>
            <button type="submit" name="deleteFiles" class="btn btn-danger btn-sm">Delete All Files</button>
            <button type="button" class="btn btn-secondary btn-sm" onclick="location.reload();">Reset Alerts</button>
        </form>
        <?php listUploads($target_dir); ?>
    </div>
</body>
</html>
