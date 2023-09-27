



const {Sequelize,DataTypes}=require('sequelize')


module.exports=(sequelize,DataTypes)=>{
    const advert_refModel=sequelize.define('advert_refModel',{
        ad_ref_name:{
            type:DataTypes.STRING,
        },
        status:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        }
    });
    return advert_refModel
}