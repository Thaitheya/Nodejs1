const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

app.post("/create-file", (req, res) => {
  const folderPath = "./textFolders";
  const today = new Date();
  const content = today
    .toISOString()
    .replace(/:/g, "-")
    .split("T")
    .join("-")
    .split(".")[0];
  const fileName = `${content}.txt`; 

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const filePath = path.join(folderPath, fileName);

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error creating file.");
    }
    res.send(`File created at ${filePath} with timestamp: ${content}`);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
