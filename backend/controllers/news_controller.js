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
        try {
            if (req.fileValidationError) {
                return res.status(400).json({ 
                    success: false,
                    error: req.fileValidationError 
                });
            }
        
            function validateNews(news) {
                const schema = Joi.object({
                    header: Joi.string().allow(null, '').max(255),
                    content: Joi.string().allow(null, ''),
                    link: Joi.string().allow(null, '').max(1000),
                    tag: Joi.string().required().max(100),
                    studentId: Joi.alternatives()
                        .try(
                            Joi.number().integer().positive(),
                            Joi.valid(null), 
                            Joi.string().valid('null')
                        )
                }).unknown(true);
                return schema.validate(news);
            }
        
            const { error } = validateNews(req.body);
            if (error) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Validation error',
                    error: error.details[0].message 
                });
            }
        
            const newsData = { ...req.body };
        
            // Convert 'null' string to null if it exists
            if (newsData.studentId === 'null') {
                newsData.studentId = null;
            }
        
            if (req.file) {
                try {
                    newsData.image = req.file.originalname;
                } catch (fileError) {
                    console.error('File processing error:', fileError);
                    return res.status(500).json({
                        success: false,
                        message: 'Error processing image file',
                        error: fileError.message
                    });
                }
            }
        
            // Validate that either content or link is provided
            if (!newsData.content && !newsData.link) {
                return res.status(400).json({
                    success: false,
                    message: 'Either content or link must be provided'
                });
            }
        
            const news = await db.news.create(newsData);
            
            return res.status(201).json({
                success: true,
                message: 'News created successfully',
                data: news
            });
            
        } catch (error) {
            console.error('Error creating news:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to create news',
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
        
            function validateNews(news) {
                const schema = Joi.object({
                    header: Joi.string().allow(null, '').max(255),
                    content: Joi.string().allow(null, ''),
                    link: Joi.string().allow(null, '').max(1000),
                    tag: Joi.string().required().max(100),
                    studentId: Joi.alternatives().try(Joi.number(), Joi.valid(null), Joi.string().valid('null'))
                }).unknown(true);
                return schema.validate(news);
            }
        
            const { error } = validateNews(req.body);
            if (error) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Validation error',
                    error: error.details[0].message 
                });
            }
            
            // Check if news exists
            const existingNews = await db.news.findByPk(req.params.id);
            if (!existingNews) {
                return res.status(404).json({
                    success: false,
                    message: 'News not found'
                });
            }
        
            const newsData = { ...req.body };
        
            // Convert 'null' string to null if it exists
            if (newsData.studentId === 'null') {
                newsData.studentId = null;
            }
        
            if (req.file) {
                try {
                    // Delete old image if it exists
                    if (existingNews.image) {
                        const oldImagePath = `./newsImages/${existingNews.image}`;
                        try {
                            await fs.unlink(oldImagePath);
                        } catch (unlinkError) {
                            console.warn('Warning: Could not delete old news image:', unlinkError.message);
                        }
                    }
                    newsData.image = req.file.originalname;
                } catch (fileError) {
                    console.error('File processing error:', fileError);
                    return res.status(500).json({
                        success: false,
                        message: 'Error processing image file',
                        error: fileError.message
                    });
                }
            }
            
            // Validate that either content or link is provided
            if (!newsData.content && !newsData.link) {
                return res.status(400).json({
                    success: false,
                    message: 'Either content or link must be provided'
                });
            }
        
            await db.news.update(newsData, {
                where: { id: req.params.id },
                returning: true,
                plain: true
            });
            
            const updatedNews = await db.news.findByPk(req.params.id);
        
            return res.json({
                success: true,
                message: 'News updated successfully',
                data: updatedNews
            });
            
        } catch (error) {
            console.error('Error updating news:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to update news',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
            });
        }
    },
    
    delete: async (req, res) => {
        try {
            const newsId = req.params.id;

            // Check if news exists
            const news = await db.news.findByPk(newsId);
            if (!news) {
                return res.status(404).json({
                    success: false,
                    message: 'News not found'
                });
            }

            await deleteNews(newsId);

            return res.status(200).json({
                success: true,
                message: 'News deleted successfully'
            });

        } catch (error) {
            console.error('Error deleting news:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to delete news',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
            });
        }
    },
}