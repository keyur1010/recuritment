const { Sequelize, DataTypes, DATE } = require('sequelize');


const sequelize = new Sequelize('recruit_portal', 'root', '', {
  host: 'localhost', 
  dialect: 'mysql',
  logging:false,
  pool:{
    max:500000,
    min:0,
    acquire:300000,
    idle:100000,
    evict:10000
  }
});



sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const db={}
db.Sequelize=Sequelize
db.sequelize=sequelize

db.loginModel=require('../app/model/loginModel')(sequelize,DataTypes)
db.clientModel=require('../app/model/clientModel')(sequelize,DataTypes)
db.clientMultiModel=require('../app/model/clientMultiModel')(sequelize,DataTypes)
db.departmentModel=require('../app/model/departmentModel')(sequelize,DataTypes)
db.companyModel=require('../app/model/companyModel')(sequelize,DataTypes)
db.fin_yearsModel=require('../app/model/fin_yearsModel')(sequelize,DataTypes)
db.g_jobModel=require('../app/model/g_jobModel')(sequelize,DataTypes)
db.g_industryModel=require('../app/model/g_industryModel')(sequelize,DataTypes)
db.skillModel=require('../app/model/skillModel')(sequelize,DataTypes)
db.advert_refModel=require('../app/model/advert_refModel')(sequelize,DataTypes)
db.EmployeeModel=require('../app/model/EmployeeModel')(sequelize,DataTypes)
db.clientPersonalModel=require('../app/model/clientPersonalModel')(sequelize,DataTypes)

db.m_clientModelIndustry=require('../app/model/m_clientModelIndustry')(sequelize,DataTypes)
db.m_clientSkillModel=require('../app/model/m_clientSkillModel')(sequelize,DataTypes)

db.m_clientJobModel=require('../app/model/m_clientJobModel')(sequelize,DataTypes)

db.recruitmentModel=require('../app/model/recruitmentModel')(sequelize,DataTypes)
db.r_skillModel=require('../app/model/r_skillModel')(sequelize,DataTypes)
db.r_industryModel=require('../app/model/r_industryModel')(sequelize,DataTypes)

//associate


db.loginModel.hasOne(db.clientModel,{foreignKey:"login_id"})
db.clientModel.belongsTo(db.loginModel, { foreignKey: "login_id"})


db.m_clientModelIndustry.belongsTo(db.g_industryModel,{foreignKey:"industry_id",as:"industry1"})
db.m_clientSkillModel.belongsTo(db.skillModel,{foreignKey:"skill_id",as:"skills"})
db.m_clientJobModel.belongsTo(db.g_jobModel,{foreignKey:"job_id",as:"jobs"})

db.recruitmentModel.belongsTo(db.departmentModel, {
  foreignKey: 'department_id',
  as: 'recruit_departments',
});
db.r_industryModel.belongsTo(db.g_industryModel,{foreignKey:"industry_id",as:"industry2"})
db.r_skillModel.belongsTo(db.skillModel,{foreignKey:"skill_id",as:"skill2"})










db.sequelize.sync({force:false,alter:true}).then(()=>{
  console.log('THIS IS SYNC')
})
module.exports=db