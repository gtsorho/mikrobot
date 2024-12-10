const _ = require('lodash')
const db = require('../models')
const Joi = require('joi')
const {Op, Sequelize } = require("sequelize")
require('dotenv').config()
const path = require('path');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports = {


    getFacts: async(req, res)=>{
        let facts = await db.facts.findAll({})
        res.send(facts)
    },

    create: async (req, res) => {

        function validExtOfficer(user){
            const schema = Joi.object({
                title:Joi.string().required(),
                figure:Joi.number().required(),
                description: Joi.string().required(),
                icon: Joi.string().required()
            })

            return schema.validate(user)
        }

        const validate = validExtOfficer(req.body) 
        if (validate.error) return res.status(400).send(validate.error.details[0].message)

        let fact = await db.facts.findOne({where:{title:req.body.title}})
        if(fact) return res.status(400).send('fact already exists')
        
        fact = await db.facts.create(req.body)
        
        res.send(fact)
    }, 
    update: async (req, res) => {
  
        const fact =  await db.facts.update(req.body, {where:{id : req.params.id}});
        
        res.status(200).send(`${req.params.id} has been updated`)
    },

    
    delete: async(req, res) =>{
       let fact = await db.facts.destroy({
          where: {
            id: req.params.id
          }
        });
        res.sendStatus(200)  
    },
}