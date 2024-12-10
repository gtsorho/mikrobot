const _ = require('lodash')
const db = require('../models')
const Joi = require('joi')
const {Op, Sequelize } = require("sequelize")
const axios = require('axios');
const {getLinkPreview, getPreviewFromContent } = require("link-preview-js");


const deleteNews = async (newsId) => {
    const news = await db.news.findOne({
        where: {
            id: newsId
        }
    });

    if (!news) {
        return 'no news found'; 
    }

    const imagePath = `./newsImages/${news.image}`;
    
    await db.news.destroy({
        where: {
            id: newsId
        }
    });
    await fs.unlink(imagePath);
};
 

module.exports = {


    getNews: async(req, res)=>{
        const allNews = await db.news.findAll({
            include:[
                {
                    model:db.student
                }
            ]
        });

        for (const article of allNews) {
            if (article.link) {
                try {
                    await getLinkPreview(article.link, {
                        timeout: 5000,
                        headers: {
                            "user-agent": "googlebot", 
                          },
                    }).then((data) => {
                            article.header = data.title
                            article.image = data.images[0]
                            article.content = data.description
                            article.dataValues['src'] = data.siteName
                            article.dataValues['url'] = data.url
                        }
                    );
                } catch (error) {
                    console.error(`Error fetching data for article with link ${article.link}:`, error.message);
                }
            }
        }
        res.send(allNews)

    },

    getOneNews: async(req, res)=>{
        const news = await db.news.findOne({
            where:{id:req.params.id},
            include:[
                {
                    model:db.student
                }
            ]
        });
        
        res.send(news)
    },

    create: async (req, res) => {

        if (req.fileValidationError) {
            return res.status(400).json({ error: req.fileValidationError });
        }

        function validExtOfficer(news){
            const schema = Joi.object({
                header:Joi.string().allow(null),
                content:Joi.string().allow(null),
                link:Joi.string().allow(null),
                tag:Joi.string().required(),
                studentId:Joi.allow(null)
            }).unknown(true)
            return schema.validate(news)
        }
        const validate = validExtOfficer(req.body) 
        if (validate.error) return res.status(400).send(validate.error.details[0].message)


        let news = req.body

        if (req.file) {
            news.image = req.file.originalname
        }

        news = await db.news.create(news)
        res.send(news)

    }, 
    update: async (req, res) => {

        if (req.fileValidationError) {
            return res.status(400).json({ error: req.fileValidationError });
        }

        function validExtOfficer(news){
            const schema = Joi.object({
                header:Joi.string().allow(null),
                content:Joi.string().allow(null),
                link:Joi.string().allow(null),
                tag:Joi.string().required(),
                studentId:Joi.allow(null)
            }).unknown(true)
            return schema.validate(news)
        }
        const validate = validExtOfficer(req.body) 
        if (validate.error) return res.status(400).send(validate.error.details[0].message)


        let news = req.body

        if (req.file) {
            news.image = req.file.originalname
        }

        news = await db.news.update(req.body, {
            where:{id : req.params.id}
        })

        res.send(news)
    },

    
    delete: async (req, res) => {
        const newsId = req.params.id;

        await deleteNews(newsId);

        res.sendStatus(200);
    },
}