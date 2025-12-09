const express = require("express");
let multer = require('multer');
const cc = require('../controllers/students_controller');
const authenticateToken = require('../middleware/auth');


require('dotenv').config()

const router = express.Router()
let upload = multer();

const profileUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${process.env.UPLOADS_PATH}/profile_images`);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});


  router.get('/', cc.getStudents);
  router.get('/student/:id', cc.getStudent);
  router.post('/',[ authenticateToken,  profileUpload.single("image")], cc.create);
  router.post('/update/:id', [authenticateToken, profileUpload.single("image")], cc.update);
  router.get('/delete/:id', authenticateToken, cc.delete);
  router.get('/search/:searchValue', upload.fields([]), cc.search)
  router.get('/gallery', cc.getGallery)

module.exports = router
