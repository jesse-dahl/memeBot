const multer = require("multer");
const path = require('path');

// Set Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init upload variable
const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('imageUpload');

// Check file type
function checkFileType(file, cb) {
  // Allowed extensions
  const fileTypes = /jpeg|jpg|png|gif/;

  // Check ext
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  // Check MIME type
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return (cb(null, true));
  } else {
    cb('Error: Images Only');
  }
}

module.exports = upload;