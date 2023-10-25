const {Sequelize,DataTypes}=require('sequelize')


module.exports=(sequelize,DataTypes)=>{
    const clientMultiModel=sequelize.define('clientMultiModel',{
        service_name:{
            type:DataTypes.STRING,
        },
        service_position:{
            type:DataTypes.STRING,
        },
        service_number:{
            type:DataTypes.STRING,
        },
        service_mobile:{
            type:DataTypes.STRING,
        },
        service_email:{
            type:DataTypes.STRING,
        },
        service_address:{
            type:DataTypes.STRING,
        },
    });
    return clientMultiModel
}


