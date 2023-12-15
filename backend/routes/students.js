const express = require("express");
let multer = require('multer');
const cc = require('../controllers/students_controller');
const authenticateToken = require('../middleware/auth');


require('dotenv').config()

const router = express.Router()
let upload = multer();

const upFile = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, `${__dirname}/../profileImages`);
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
});

  router.get('/', cc.getStudents);
  router.get('/student/:id', cc.getStudent);
  router.post('/',[ authenticateToken,  upFile.single("image")], cc.create);
  router.post('/update/:id', [authenticateToken, upFile.single("image")], cc.update);
  router.get('/delete/:id', authenticateToken, cc.delete);
  router.get('/search/:searchValue', upload.fields([]), cc.search)
  router.get('/gallery', cc.getGallery)

module.exports = router
