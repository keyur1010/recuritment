const {Sequelize,DataTypes}=require('sequelize')


module.exports=(sequelize,DataTypes)=>{
    const loginModel=sequelize.define('loginModel',{
        email:{
            type:DataTypes.STRING,
            allowNull: false, 
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false, 
        },
        role:{
            type:Sequelize.ENUM('Supar Admin',"Admin","Candidate","Client")
        }
    });
    return loginModel
}