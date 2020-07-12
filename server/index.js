const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("../server/config/db.config");
const Upload  = require("../server/controllers/files/upload");
const Items = require("./controllers/files/getFileData");
// const getAllItems = require("./controllers/files/getFileData");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connection.connect((err) => {
  if (err) throw new Error("Error Establishing a Database connection");
  console.log('Database connected Successfully');
});


app.post('/api/upload', Upload);
app.get('/api/getItems', Items.getItems);
app.get('/api/getAllItems', Items.getAllItems);

app.listen(8000, () => console.log("App running on port 8000"));
