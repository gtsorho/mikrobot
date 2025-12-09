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
        try {
            if (req.fileValidationError) {
                return res.status(400).json({ error: req.fileValidationError });
            }

            function validateStudent(student) {
                const schema = Joi.object({
                    name: Joi.string().required().min(2).max(100),
                    dob: Joi.date().required(),
                    guardian: Joi.string().required().min(2).max(100),
                    phone: Joi.string().required().min(10).max(15),
                    profile: Joi.string().required(),
                    tag: Joi.string().required(),
                    sub_profile: Joi.string().allow(null, '').max(1000),
                    achievement: Joi.string().allow(null, '').max(1000),
                }).unknown(true);
                return schema.validate(student);
            }

            const { error } = validateStudent(req.body);
            if (error) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Validation error',
                    error: error.details[0].message 
                });
            }

            const studentData = { ...req.body };
            
            if (req.file) {
                try {
                    studentData.image = req.file.originalname;
                } catch (fileError) {
                    console.error('File processing error:', fileError);
                    return res.status(500).json({
                        success: false,
                        message: 'Error processing image file',
                        error: fileError.message
                    });
                }
            }

            const student = await db.student.create(studentData);
            
            return res.status(201).json({
                success: true,
                message: 'Student created successfully',
                data: student
            });

        } catch (error) {
            console.error('Error creating student:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to create student',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
            });
        }
    }, 
    update: async (req, res) => {
        try {
            if (req.fileValidationError) {
                return res.status(400).json({ 
                    success: false,
                    error: req.fileValidationError 
                });
            }

            function validateStudent(student) {
                const schema = Joi.object({
                    name: Joi.string().required().min(2).max(100),
                    dob: Joi.date().required(),
                    guardian: Joi.string().required().min(2).max(100),
                    phone: Joi.string().required().min(10).max(15),
                    profile: Joi.string().required(),
                    tag: Joi.string().required(),
                    sub_profile: Joi.string().allow(null, '').max(1000),
                    achievement: Joi.string().allow(null, '').max(1000),
                }).unknown(true);
                return schema.validate(student);
            }

            const { error } = validateStudent(req.body);
            if (error) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Validation error',
                    error: error.details[0].message 
                });
            }

            // Check if student exists
            const existingStudent = await db.student.findByPk(req.params.id);
            if (!existingStudent) {
                return res.status(404).json({
                    success: false,
                    message: 'Student not found'
                });
            }

            const studentData = { ...req.body };
            
            if (req.file) {
                try {
                    // Delete old image if it exists
                    if (existingStudent.image) {
                        const oldImagePath = `./profileImages/${existingStudent.image}`;
                        try {
                            await fs.unlink(oldImagePath);
                        } catch (unlinkError) {
                            console.warn('Warning: Could not delete old profile image:', unlinkError.message);
                        }
                    }
                    studentData.image = req.file.originalname;
                } catch (fileError) {
                    console.error('File processing error:', fileError);
                    return res.status(500).json({
                        success: false,
                        message: 'Error processing image file',
                        error: fileError.message
                    });
                }
            }

            await db.student.update(studentData, {
                where: { id: req.params.id },
                returning: true,
                plain: true
            });

            const updatedStudent = await db.student.findByPk(req.params.id);
            
            return res.json({
                success: true,
                message: 'Student updated successfully',
                data: updatedStudent
            });

        } catch (error) {
            console.error('Error updating student:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to update student',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
            });
        }
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
        try {
            const studentId = req.params.id;

            // Check if student exists
            const student = await db.student.findByPk(studentId);
            if (!student) {
                return res.status(404).json({
                    success: false,
                    message: 'Student not found'
                });
            }

            await deleteStudentProfile(studentId);

            return res.status(200).json({
                success: true,
                message: 'Student deleted successfully'
            });

        } catch (error) {
            console.error('Error deleting student:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to delete student',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
            });
        }
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