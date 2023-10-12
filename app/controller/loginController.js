const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../config/database");
const md5 = require("md5");
const loginModel = db.loginModel;

exports.loginPage = async (req, res) => {
  try {
    console.log("login page");
    const data = await loginModel.findOne({ where: { role: "Super Admin" } });
    // console.log(data)
    return res.render("./login.ejs", { data,messages:req.flash() });
  } catch (error) {
    console.log(error);
    req.flash('error','Something Went Wrong')
    return res.redierect('/login')
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await loginModel.findOne({ where: { email: email } });
    
    if (!checkUser) {
      req.flash("error", "Invalid email & password");
      return res.redirect("/login");
    } else {
      if (md5(password) === checkUser.password) {
        req.session.user = checkUser;
        if (checkUser.role == "Super Admin") {
          req.flash("success", "Welcome, Super Admin!");
          return res.redirect("/admin/admindashboard");
        } else if (checkUser.role == "Admin") {
          req.flash("success", "Welcome, Admin!");
          return res.redirect("/m_admin/simpleAdmin");
        } else if (checkUser.role == "Client") {
          req.flash("success", "Welcome, Client!");
          return res.redirect("/client/clientView");
        } else if (checkUser.role == "Candidate") {
          req.flash("success", "Welcome, Candidate!");
          return res.redirect("/candidate/candidate");
        } else {
          console.log("here nobody mentioned this role");
        }
      } else {
        req.flash("error", "Incorrect password");
        return res.redirect("/login");
      }
    }
    
    // ...
  } catch (error) {
    console.log(error);
    req.flash('error','Something Went Wrong')
    return res.redirect('/login')
  }
};

exports.logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        req.flash('error', 'Something Went Wrong');
        return res.redirect('/login');
      } else {
        // req.flash('error', 'Logout Successfully');
        return res.redirect('/login');
      }
    });
    
  } catch (error) {
    console.log(error);
    req.flash('error','Something Went Wrong')
    return res.redirect('/login')
    
  }
};

