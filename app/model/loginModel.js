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
            type:Sequelize.ENUM('Super Admin',"Admin","Candidate","Client")
        },
        login_random:{
            type:DataTypes.STRING
        }
    });
    return loginModel
}