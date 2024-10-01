const _ = require('lodash')
const db = require('../models')
const Joi = require('joi')
const {Op, Sequelize } = require("sequelize")
require('dotenv').config()
const path = require('path');
const { google } = require('googleapis');
const { JWT } = require('google-auth-library');
const fs = require('fs').promises;


const deleteStudentProfile = async (studentId) => {
    const student = await db.student.findOne({
        where: {
            id: studentId
        }
    });

    if (!student) {
        return; 
    }

    const imagePath = `./profileImages/${student.image}`;
    
    await db.student.destroy({
        where: {
            id: studentId
        }
    });
    await fs.unlink(imagePath);
};
 
module.exports = {


    getStudents: async(req, res)=>{
        let students = await db.student.findAll({})
        res.send(students)
    },

    getStudent: async(req, res)=>{
        let student = await db.student.findOne({
            where:{id: req.params.id}
        })
        res.send(student)
    },

    create: async (req, res) => {

        if (req.fileValidationError) {
            return res.status(400).json({ error: req.fileValidationError });
        }

        function validExtOfficer(student){
            const schema = Joi.object({
                name:Joi.string().required(),
                dob:Joi.date().required(),
                guardian:Joi.string().required(),
                phone:Joi.string().required(),
                profile:Joi.string().required(),
                tag:Joi.string().required(),
                sub_profile:Joi.string().allow(null).allow(''),
                achievement:Joi.string().allow(null).allow(''),
            }).unknown(true)
            return schema.validate(student)
        } 
        const validate = validExtOfficer(req.body) 
        if (validate.error) return res.status(400).send(validate.error.details[0].message)


        student = req.body
        if (req.file) {
            student.image = req.file.originalname
        }

        student = await db.student.create(student)
        res.send(student)
    }, 
    update: async (req, res) => {
        if (req.fileValidationError) {
            return res.status(400).json({ error: req.fileValidationError });
        }

        function validExtOfficer(student){
            const schema = Joi.object({
                name:Joi.string().required(),
                dob:Joi.date().required(),
                guardian:Joi.string().required(),
                phone:Joi.string().required(),
                profile:Joi.string().required(),
                tag:Joi.string().required(),  
                sub_profile:Joi.string().allow(null).allow(''),
                achievement:Joi.string().allow(null).allow(''),
            }).unknown(true)
            return schema.validate(student)
        }

        const validate = validExtOfficer(req.body) 
        if (validate.error) return res.status(400).send(validate.error.details[0].message)
        
        
        student = req.body
        if (req.file) {
            student.image = req.file.originalname
        }

        student = await db.student.update(req.body, {
            where:{id : req.params.id}
        })

        res.send(student)
    }, 

    // delete: async(req, res) =>{
    //    await db.student.destroy({
    //       where: {
    //         id: req.params.id
    //       }
    //     });
    //     res.sendStatus(200)  
    // },
    delete: async (req, res) => {
        const studentId = req.params.id;

        await deleteStudentProfile(studentId);

        res.sendStatus(200);
    },

    search: async (req, res) => {
      const whereClause = {};
  
      if (req.params.searchValue) {  
        whereClause[Op.or] = [
            { '$student.name$': { [Op.like]: `%${req.params.searchValue}%` }},
        ];
      }
  
      const searchResults = await db.student.findAll({
        where: whereClause,
      });
  
      res.send(searchResults);
  },
  getGallery: async (req, res)=>{

    const KEYFILEPATH = path.join(__dirname, '../../4501.json');
    const SCOPES = ['https://www.googleapis.com/auth/drive'];
      
    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILEPATH,
      scopes: SCOPES,
    });

    const driveService = google.drive({ version: 'v3', auth });
    var result = await driveService.files.list({
        q: "'1vEf9o5h4oOMA2LhOsLuQc4b4iwnTeKYg' in parents",
        fields: 'files(name, webContentLink, thumbnailLink)'
      });

      result.data.files.forEach(file => {
        if (file.thumbnailLink) {
            file.thumbnailLink  = file.thumbnailLink.replace(/=s\d+/, '=s1600');
        }
      });

      res.send(result)
    } 
  
}