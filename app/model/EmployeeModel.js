
const {Sequelize,DataTypes}=require('sequelize')


module.exports=(sequelize,DataTypes)=>{
    const EmployeeModel=sequelize.define('EmployeeModel',{
        fname:{
            type:DataTypes.STRING,
        },
        lname:{
            type:DataTypes.STRING,
        },
        em_username:{
            type:DataTypes.STRING,
        },
        contact:{
            type:DataTypes.STRING,
        },
        em_address:{
            type:DataTypes.STRING,
        },
        email:{
            type:DataTypes.STRING,
        },
        dep_id:{
            type:DataTypes.STRING,
        },
        is_report_auth:{
            type:DataTypes.STRING,
        },
        manager_id:{
            type:DataTypes.STRING,
        },
        role:{
            type:DataTypes.STRING,
        },
        password:{
            type:DataTypes.STRING,
        },
        image_url:{
            type:DataTypes.STRING,
        },
        status:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        }
    });
    return EmployeeModel
}