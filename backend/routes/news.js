const express = require("express");
let multer = require('multer');
const cc = require('../controllers/news_controller');
const authenticateToken = require('../middleware/auth');


require('dotenv').config()

const router = express.Router()
let upload = multer();

// Configure multer with increased limits
const newsUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${process.env.UPLOADS_PATH}/news_images`);
    },
    filename: function (req, file, cb) {
      // Add timestamp to filename to prevent overwrites
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size
    fieldSize: 10 * 1024 * 1024, // 10MB max field size (for non-file fields)
  },
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size is too large. Maximum size is 10MB.' });
    }
    if (err.code === 'LIMIT_FIELD_COUNT' || err.code === 'LIMIT_FIELD_KEY' || err.code === 'LIMIT_FIELD_VALUE' || 
        err.code === 'LIMIT_FIELD_COUNT' || err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ error: 'File upload error: ' + err.message });
    }
  } else if (err) {
    // An unknown error occurred
    return res.status(500).json({ error: 'An error occurred during file upload.' });
  }
  // Everything went fine
  next();
};

  router.get('/', cc.getNews);
  router.get('/find/:id', cc.getOneNews);
  router.post('/', [authenticateToken, newsUpload.single("image"), handleMulterError], cc.create);
  router.post('/update/:id', [authenticateToken, newsUpload.single("image"), handleMulterError], cc.update);
  router.get('/delete/:id', authenticateToken, cc.delete);

module.exports = router
