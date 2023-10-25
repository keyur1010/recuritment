const {Sequelize,DataTypes}=require('sequelize')


module.exports=(sequelize,DataTypes)=>{
    const r_skillModel=sequelize.define('r_skillModel',{
        r_random:{
            type:DataTypes.STRING,
        },
        skill_id:{
            type:DataTypes.INTEGER
        }
    });
    return r_skillModel
}