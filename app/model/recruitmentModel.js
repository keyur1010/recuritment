const {Sequelize,DataTypes}=require('sequelize')


module.exports=(sequelize,DataTypes)=>{
    const recruitmentModel=sequelize.define('recruitmentModel',{
        client_name:{
            type:DataTypes.STRING
        },
        recruit_department:{
            type:DataTypes.STRING,
        },
        no_position:{
            type:DataTypes.STRING
        },
        current_salary:{
            type:DataTypes.INTEGER
        },
        desired_salary:{
            type:DataTypes.INTEGER
        },
        recruit_skills:{
            type:DataTypes.STRING
        },
        r_random:{
            type:DataTypes.STRING
        },
        
        
    });
    return recruitmentModel
}