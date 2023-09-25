const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../config/database");
const loginModel = db.loginModel;

exports.loginPage = async (req, res) => {
  try {
    console.log("login page");
    return res.render("./login.ejs");
  } catch (error) {
    console.log(error);
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await loginModel.findOne({ where: { email: email } });

    if (!checkUser) {
      console.log("invaild user email and password");
      return res.redirect("/login");
    } else {
        if(checkUser.role=="Supar Admin"){
            console.log('this is supar admin')
        }
        else if (checkUser.role=="Admin"){
            console.log('this is a admin')
        }else if(checkUser.role=='Client'){
            console.log('This is a Client')
        }else if(checkUser.role=='Candidate'){
            console.log('This is a Candidate')
        }else{
            console.log('here nobody mention this ')
        }

    }
    console.log("created data -------------->", checkUser);
    return res.send(checkUser);
  } catch (error) {
    console.log(error);
  }
};
