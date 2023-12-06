const {Sequelize, DataTypes}  = require("sequelize");
const student = require('./student')
const user = require('./user')

require('dotenv').config()


const sequelize = new Sequelize(
   process.env.DATABASE,
   process.env.DATABASE_USERNAME,
   process.env.DATABASE_PASSWORD,
   {
      host: process.env.DATABASE_HOST,
      port:process.env.DATABASE_PORT,
      dialect: 'mysql',
      logging: false
   }
);


const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize

db.student = student(sequelize, DataTypes)
db.user = user(sequelize, DataTypes)


sequelize.sync({ alter: true,  force: false })
.then(()=>{
    console.log('all mikbot_db in sync')
})


sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully to mikbot_fb.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

module.exports = db