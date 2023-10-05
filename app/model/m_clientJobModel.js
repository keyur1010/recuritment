const {Sequelize,DataTypes}=require('sequelize')


module.exports=(sequelize,DataTypes)=>{
    const m_clientJobModel=sequelize.define('m_clientJobModel',{
       
        client_random:{
            type:DataTypes.STRING,
        },
        job_id:{
            type:DataTypes.INTEGER
        }
    });
    return m_clientJobModel
}