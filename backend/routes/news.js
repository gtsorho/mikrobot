const express = require("express");
let multer = require('multer');
const cc = require('../controllers/news_controller');
const authenticateToken = require('../middleware/auth');


require('dotenv').config()

const router = express.Router()
let upload = multer();

const newsUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${process.env.UPLOADS_PATH}/news_images`);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

  router.get('/', cc.getNews);
  router.get('/find/:id', cc.getOneNews);
  router.post('/',[ authenticateToken,  newsUpload.single("image")], cc.create);
  router.post('/update/:id', [authenticateToken, newsUpload.single("image")], cc.update);
  router.get('/delete/:id', authenticateToken, cc.delete);

module.exports = router
