const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${__dirname}/../_uploads/post`);
  },
  filename: (req, file, callback) => {
    const filename =
      req.body.posterId + file.originalname.split(".")[0] + ".jpg";
    callback(null, filename);
  },
});

module.exports = multer({ storage: storage }).single("file");
