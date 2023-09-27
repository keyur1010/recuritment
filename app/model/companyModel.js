const {Sequelize,DataTypes}=require('sequelize')


module.exports=(sequelize,DataTypes)=>{
    const companyModel=sequelize.define('companyModel',{
        company_name:{
            type:DataTypes.STRING,
        },
        shrtname:{
            type:DataTypes.STRING,
        },
        proprietor:{
            type:DataTypes.STRING,
        },
        phone:{
            type:DataTypes.STRING,
        },
        phone2:{
            type:DataTypes.STRING,
        },
        email:{
            type:DataTypes.STRING,
        },
        email2:{
            type:DataTypes.STRING,
        },
        state:{
            type:DataTypes.STRING,
        },
        state_code:{
            type:DataTypes.STRING,
        },
        address:{
            type:DataTypes.STRING,
        },
        gst_applicable:{
            type:Sequelize.ENUM('YES','NO')
        },
        address:{
            type:DataTypes.STRING,
        },
        gst_no:{
            type:DataTypes.STRING,
        },
        pan_no:{
            type:DataTypes.STRING,
        },
        website:{
            type:DataTypes.STRING,
        },
        company_logo:{
            type:DataTypes.STRING,
        },
        password:{
            type:DataTypes.STRING,
        },
      
      

    });
    return companyModel
}