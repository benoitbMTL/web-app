<?php
$target_dir = "uploads/";
$uploadOk = 1;

// Ensure the uploads directory exists
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($_FILES["fileToUpload"]) || $_FILES["fileToUpload"]["error"] != 0) {
        echo "<div class='alert alert-danger' role='alert'>No file was uploaded or there was an upload error. Error code: " . $_FILES["fileToUpload"]["error"] . "</div>";
    } else {
        $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
        $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
        if ($check !== false) {
            echo "<div class='alert alert-success' role='alert'>File is an image - " . $check["mime"] . ".</div>";
            if (file_exists($target_file)) {
                echo "<div class='alert alert-warning' role='alert'>Sorry, file already exists.</div>";
                $uploadOk = 0;
            }
            if ($_FILES["fileToUpload"]["size"] > 500000) {
                echo "<div class='alert alert-warning' role='alert'>Sorry, your file is too large.</div>";
                $uploadOk = 0;
            }
            if (!in_array($imageFileType, ['jpg', 'png', 'jpeg', 'gif'])) {
                echo "<div class='alert alert-warning' role='alert'>Sorry, only JPG, JPEG, PNG & GIF files are allowed.</div>";
                $uploadOk = 0;
            }
            if ($uploadOk == 0) {
                echo "<div class='alert alert-danger' role='alert'>Sorry, your file was not uploaded.</div>";
            } else {
                if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
                    echo "<div class='alert alert-success' role='alert'>The file " . htmlspecialchars(basename($_FILES["fileToUpload"]["name"])) . " has been uploaded.</div>";
                } else {
                    echo "<div class='alert alert-danger' role='alert'>Sorry, there was an error uploading your file.</div>";
                }
            }
        } else {
            echo "<div class='alert alert-danger' role='alert'>File is not an image.</div>";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>File Upload Form</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h1 class="mb-3">File Upload Form</h1>
        <form action="upload.php" method="post" enctype="multipart/form-data" class="mb-3">
            <div class="mb-3">
                <label for="fileToUpload" class="form-label">Select image to upload:</label>
                <input type="file" class="form-control" name="fileToUpload" id="fileToUpload">
            </div>
            <button type="submit" class="btn btn-primary">Upload Image</button>
        </form>
    </div>
</body>
</html>
