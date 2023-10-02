const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize('recruit_portal', 'root', '', {
  host: 'localhost', 
  dialect: 'mysql',
  logging:false,
  pool:{
    max:50000,
    min:0,
    acquire:30000,
    idle:10000,
    evict:1000
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







//associate


db.loginModel.hasOne(db.clientModel,{foreignKey:"login_id"})
db.clientModel.belongsTo(db.loginModel, { foreignKey: "login_id"})












db.sequelize.sync({force:false,alter:true}).then(()=>{
  console.log('THIS IS SYNC')
})
module.exports=db