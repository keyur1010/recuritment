

const {Sequelize,DataTypes}=require('sequelize')


module.exports=(sequelize,DataTypes)=>{
    const skillModel=sequelize.define('skillModel',{
        skill_name:{
            type:DataTypes.STRING,
        },
        status:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        }
    });
    return skillModel
}