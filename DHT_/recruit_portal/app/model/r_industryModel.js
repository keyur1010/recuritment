const {Sequelize,DataTypes}=require('sequelize')


module.exports=(sequelize,DataTypes)=>{
    const r_industryModel=sequelize.define('r_industryModel',{
        r_random:{
            type:DataTypes.STRING,
        },
        industry_id:{
            type:DataTypes.INTEGER
        }
    });
    return r_industryModel
}