const {Sequelize,DataTypes}=require('sequelize')


module.exports=(sequelize,DataTypes)=>{
    const m_clientSkillModel=sequelize.define('m_clientSkillModel',{
       
        client_random:{
            type:DataTypes.STRING,
        },
        skill_id:{
            type:DataTypes.INTEGER
        }
    });
    return m_clientSkillModel
}