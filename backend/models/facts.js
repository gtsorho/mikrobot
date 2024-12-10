module.exports = (sequelize, DataTypes) => {
    const facts = sequelize.define('facts', {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        figure: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        icon: {
          type: DataTypes.TEXT,
          allowNull: true,
        }
      });
    return facts 
}