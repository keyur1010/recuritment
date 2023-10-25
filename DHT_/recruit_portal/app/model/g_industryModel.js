const {Sequelize,DataTypes}=require('sequelize')


module.exports=(sequelize,DataTypes)=>{
    const g_industryModel=sequelize.define('g_industryModel',{
        industry_name:{
            type:DataTypes.STRING,
        },
        status:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        }
    });
    return g_industryModel
}