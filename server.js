const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')
const students = require('./backend/routes/students')
const users = require('./backend/routes/users')


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



app.use('/', serveStatic(path.join(__dirname,'/dist')))
app.use('/profile_images', express.static(path.join(__dirname, 'backend', 'profileImages')));

app.get(/.*/, function(req, res){
    res.sendFile(path.join(__dirname, 'dist/index.html'))
})

  

const port = process.env.PORT || 3000
app.listen(port)
console.log('listening on port:' + port)
