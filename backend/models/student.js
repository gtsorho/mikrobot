module.exports = (sequelize, DataTypes) => {
    const student = sequelize.define('student', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dob: {
            type: DataTypes.DATE,
            allowNull:false
        },
        guardian: {
            type: DataTypes.TEXT,
            allowNull:false
        },
        phone: {
            type: DataTypes.TEXT, 
            allowNull:false,
        },
        profile: {
            type: DataTypes.TEXT,
            allowNull:false,
        },
        sub_profile:{
            type: DataTypes.TEXT,
            allowNull:true,
        },
        achievement:{
            type: DataTypes.TEXT,
            allowNull:true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull:true,

        },
    })
    return student
}