const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());

app.post('create-file', ( res, req )=> {
   const folderPath = "./textFolders";
   const today = new Date();
   const content = today
   .toISOString()
   .replace(/:/g, "-")
   .split("T")
   .split(".")[0];

   const fileName = `${content}.txt`

   if(!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, {recursive : true})
   }


   const filePath = path.join(filePath, fileName);

   fs.writeFile(filePath, content, (err)=> {
      if(err) {
        console.err(err);
        return res.status(500).send("Error creating file.")
      }
      return res.send(`File created at ${filePath} with timestamp: ${content}`)
   })
})


const PORT =3000;
app.listen(PORT, ()=> {
   
})