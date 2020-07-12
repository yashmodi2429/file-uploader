const fs = require("fs");
const multer = require("multer");
const fastcsv = require("fast-csv");
const connection = require("../../config/db.config");

let fileName = "";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(__dirname);
    cb(null, __dirname + "/static_files");
  },
  filename: function (req, file, cb) {
    fileName = file.originalname;
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

const Upload = (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    insertFileInDb();
    return res.status(200).send(req.file);
  });
};

const insertFileInDb = () => {
  let stream = fs.createReadStream(__dirname + "/static_files/" + fileName);
  let csvData = [];
  let csvStream = fastcsv
    .parse()
    .on("data", function (data) {
      csvData.push(data);
    })
    .on("end", function () {
      // remove the first line: header
      csvData.shift();
      let query =
        "INSERT INTO category (id, level, cvss, title, vulnerability, solution, reference) VALUES ?";
      connection.query(query, [csvData], (error, response) => {
        console.log(error || response);
      });
    });
  stream.pipe(csvStream);
};

module.exports = Upload;
