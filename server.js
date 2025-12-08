const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')
const students = require('./backend/routes/students')
const users = require('./backend/routes/users')
const news = require('./backend/routes/news')
const facts = require('./backend/routes/facts')
const multer = require('multer');


const cors = require('cors');
require('dotenv').config()


const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cors({
    origin: '*'
}));

app.use('/api/students', students)
app.use('/api/users', users)
app.use('/api/news', news)
app.use('/api/facts', facts)



app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      res.status(400).send('Multer Error: ' + err.message);
    } else {
      res.status(500).send('Internal Server Error');
    }
  });

app.use('/', serveStatic(path.join(__dirname,'/dist')))
app.use('/profile_images', express.static(path.join(__dirname, 'backend', 'profileImages')));
app.use('/news_images', express.static(path.join(__dirname, 'backend', 'newsImages')));


app.get(/^\/(?!api).*/, function(req, res){
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

  

const port = process.env.PORT || 3000
app.listen(port)
console.log('listening on port:' + port)
