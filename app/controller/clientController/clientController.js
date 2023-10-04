const { Sequelize, DataTypes } = require("sequelize");

const db=require('../../../config/database')

const loginModel = db.loginModel;

exports.clientPage = async (req, res) => {
  try {
    console.log("client page");
    return res.render("./clientSign.ejs");
  } catch (error) {
    console.log(error);
  }
};
exports.clientLogin=async(req,res)=>{
  try {
      const data=await client
  } catch (error) {
    
  }
}