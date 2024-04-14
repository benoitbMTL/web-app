const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const util = require("util");
const app = express();

app.use(fileUpload());

// Correct the path to serve static files correctly
app.use('/upload', express.static(path.join(__dirname, 'public')));

app.post("/api/upload", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  let uploadedFile = req.files.file;
  uploadedFile.mv(path.join(__dirname, "public", uploadedFile.name), (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ success: true, fileName: uploadedFile.name });
  });
});

app.get("/api/files", async (req, res) => {
  const directoryPath = path.join(__dirname, "public");
  try {
    const files = await util.promisify(fs.readdir)(directoryPath);
    const fileInfos = files.map(file => {
      const stats = fs.statSync(path.join(directoryPath, file));
      return `<li><a href="/upload/${file}">${file}</a> (${(stats.size / 1024).toFixed(2)} KB)</li>`;
    });
    res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Uploaded Files</title>
                <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body>
                    <ul>${fileInfos.join("")}</ul>
            </body>
            </html>
        `);
  } catch (err) {
    res.status(500).send("Unable to scan directory: " + err);
  }
});

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
