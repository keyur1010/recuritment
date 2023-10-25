const {Sequelize,DataTypes}=require('sequelize')


module.exports=(sequelize,DataTypes)=>{
    const m_clientModelIndustry=sequelize.define('m_clientModelIndustry',{
       
        client_random:{
            type:DataTypes.STRING,
        },
        industry_id:{
            type:DataTypes.INTEGER
        }
    });
    return m_clientModelIndustry
}