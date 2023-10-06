const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../config/database");
const loginModel = db.loginModel;

exports.loginPage = async (req, res) => {
  try {
    console.log("login page");
    const data=await loginModel.findOne({where:{role:"Super Admin"}})
    // console.log(data)
    return res.render("./login.ejs",{data});
  } catch (error) {
    console.log(error);
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await loginModel.findOne({ where: { email: email } });
    req.session.user=checkUser
    console.log(req.session.user)
    if (!checkUser) {
      console.log("invaild user email and password");
      return res.redirect("/login");
    } else {
       if(checkUser.role=="Super Admin"){
                console.log('this is super admin')
                return res.redirect('/admin/admindashboard')
            }
            else if (checkUser.role=="Admin"){
                console.log('this is a admin')
                return res.redirect('/m_admin/simpleAdmin')
            }else if(checkUser.role=='Client'){
                console.log('This is a Client')
                return res.redirect('/client/clientView')
            }else if(checkUser.role=='Candidate'){
                console.log('This is a Candidate')
                return res.redirect('/candidate/candidate')
            }else{
                console.log('here nobody mention this ')
            }

    }
    console.log("created data -------------->", checkUser);
    // return res.send(checkUser);
  } catch (error) {
    console.log(error);
  }
};
