const {Sequelize,DataTypes}=require('sequelize')


module.exports=(sequelize,DataTypes)=>{
    const departmentModel=sequelize.define('departmentModel',{
        dep_code:{
            type:DataTypes.STRING,
        },
        department_name:{
            type:DataTypes.STRING,
        },
        status:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        }
    });
    return departmentModel
}