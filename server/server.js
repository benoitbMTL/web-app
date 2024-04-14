const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const util = require("util");
const app = express();

app.use(fileUpload());

// Serve static files from a 'public' directory now
app.use("/public", express.static(path.join(__dirname, "public")));

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
      return `<li><a href="/public/${file}">${file}</a> (${(stats.size / 1024).toFixed(2)} KB)</li>`;
    });
    res.send(`<html>...</html>`); // Complete HTML response for brevity
  } catch (err) {
    res.status(500).send("Unable to scan directory: " + err);
  }
});

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});