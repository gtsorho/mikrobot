module.exports = (sequelize, DataTypes) => {
    const news = sequelize.define('news', {
        header: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        link: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        tag: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isIn: [['news', 'article', 'announcement']],
          },
        },
      });
    return news 
}