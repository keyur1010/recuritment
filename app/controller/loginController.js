const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../config/database");
const md5 = require("md5");
const loginModel = db.loginModel;

exports.loginPage = async (req, res) => {
  try {
    console.log("login page");
    const data = await loginModel.findOne({ where: { role: "Super Admin" } });
    // console.log(data)
    return res.render("./login.ejs", { data });
  } catch (error) {
    console.log(error);
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await loginModel.findOne({ where: { email: email } });
    req.session.user = checkUser;
    console.log(req.session.user);
    if (!checkUser) {
        console.log("invaild user email and password");
        return res.redirect("/login");
      } else {
        if (md5(password) === checkUser.password) {
        if (checkUser.role == "Super Admin") {
          console.log("this is super admin");
          return res.redirect("/admin/admindashboard");
        } else if (checkUser.role == "Admin") {
          console.log("this is a admin");
          return res.redirect("/m_admin/simpleAdmin");
        } else if (checkUser.role == "Client") {
          console.log("This is a Client");
          return res.redirect("/client/clientView");
        } else if (checkUser.role == "Candidate") {
          console.log("This is a Candidate");
          return res.redirect("/candidate/candidate");
        } else {
          console.log("here nobody mention this ");
        }
      }else{
        console.log("password is incorrect");
        return res.redirect("/");
      }
      }
    
    console.log("created data -------------->", checkUser);
    // return res.send(checkUser);
  } catch (error) {
    console.log(error);
  }
};

exports.logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        res.sendStatus(500);
      } else {
        res.redirect("/login"); // Redirect to the login page or any other desired page
      }
    });
  } catch (error) {
    console.log(error);
  }
};
