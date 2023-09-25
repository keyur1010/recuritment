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


// db.userModel.hasOne(db.hrModel,{foreignKey:"user_id",as:'users'})
// db.hrModel.belongsTo(db.userModel, { foreignKey: "user_id",as:'users' })


db.sequelize.sync({force:false,alter:true}).then(()=>{
  console.log('THIS IS SYNC')
})
module.exports=db