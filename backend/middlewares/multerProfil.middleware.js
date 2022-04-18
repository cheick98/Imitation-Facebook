const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${__dirname}/../_uploads/profil`);
  },
  filename: (req, file, callback) => {
    const filename = req.body.userId + ".jpg";
    callback(null, filename);
  },
});

module.exports = multer({
  storage: storage,
}).single("file");
