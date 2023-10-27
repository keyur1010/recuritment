const { Sequelize, DataTypes, DATE, Op, where } = require("sequelize");
const nodemailer = require("nodemailer");
const md5 = require("md5");
const db = require("../../../config/database");

// const { doesNotMatch } = require("assert");
const path = require("path");
const fs = require("fs");
const { encode } = require("punycode");
require("../../../routes/adminRoutes");
const loginModel = db.loginModel;
const clientModel = db.clientModel;
const clientMultiModel = db.clientMultiModel;
const departmentModel = db.departmentModel;
const companyModel = db.companyModel;
const fin_yearsModel = db.fin_yearsModel;
const g_jobModel = db.g_jobModel;
const g_industryModel = db.g_industryModel;
const skillModel = db.skillModel;
const advert_refModel = db.advert_refModel;
const EmployeeModel = db.EmployeeModel;
const clientPersonalModel = db.clientPersonalModel;
const m_clientModelIndustry = db.m_clientModelIndustry;
const m_clientJobModel = db.m_clientJobModel;

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "mubdadakeyur@gmail.com",
    pass: "wevz nuig tjgk txzd",
  },
});

exports.adminDashboard = async (req, res) => {
  try {
    console.log("login page");
    const session = await loginModel.findOne({
      where: { role: req.session.user.role },
    });
    return res.render("./admin/dashboard.ejs", {
      session: session,
      messages: req.flash(),
    });
  } catch (error) {
    console.log(error);
  }
};

exports.newClient = async (req, res) => {
  try {
    console.log("new client");
    // req.flash("success", "");
    const session = await loginModel.findOne({
      where: { role: req.session.user.role },
    });

    return res.render("./admin/clientCreate.ejs", {
      session: session,
      messages: req.flash(),
    });
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};
exports.newClientCreate = async (req, res) => {
  console.log("this is req.body ---------->", req.body);

  try {
    const {
      client_name,
      type,
      registered_address,
      contract_name,
      contract_position,
      contract_number,
      contract_mobile,
      contract_email,
      website,
      industry,
      vat_number,
      registration_no,
      client_logo,
      img_url,
      subscrption_level_agreed,
      payroll_subsribe,
      employement_contract,
      service,
      services,
      finance_name,
      finance_position,
      finance_number,
      finance_mobile,
      finance_email,
      finance_credit_limit,
      finance_debit_details,
      billing_name,
      billing_position,
      billing_number,
      billing_mobile,
      billing_email,
    } = req.body;
    const checkClientemail = await loginModel.findOne({
      where: { email: contract_email },
    });
    if (!checkClientemail) {
      const hashedPassword = md5("123456");

      const { originalname, filename } = req.file;
      function generateRandomString(length) {
        const letters = "abcdefghijklmnopqrstuvwxyz";
        let randomString = "";

        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * letters.length);
          randomString += letters.charAt(randomIndex);
        }

        return randomString;
      }

      const now = new Date();
      const dateString = now.toISOString().replace(/[^0-9]/g, "");
      const randomStringLength = dateString.length;

      const randomString =
        generateRandomString(randomStringLength) + dateString;

      const allServices = {
        service_name: req.body.service_name,
        service_position: req.body.service_position,
        service_number: req.body.service_number,
        service_mobile: req.body.service_mobile,
        service_email: req.body.service_email,
        service_address: req.body.service_address, // Corrected property name
      };

      const serviceDataJSON = JSON.stringify(allServices);

      const insertOn = new Date();
      const data = await clientModel.create({
        client_name: client_name,
        type: type,
        registered_address: registered_address,
        contract_name: contract_name,
        contract_position: contract_position,
        contract_number: contract_number,
        contract_mobile: contract_mobile,
        contract_email: contract_email,
        website: website,
        industry: industry,
        vat_number: vat_number,
        registration_no: registration_no,
        client_logo: filename,
        img_url: img_url,
        subscrption_level_agreed: subscrption_level_agreed,
        payroll_subsribe: payroll_subsribe,
        employement_contract: employement_contract,
        service: service,
        finance_name: finance_name,
        finance_position: finance_position,
        finance_number: finance_number,
        finance_mobile: finance_mobile,
        finance_email: finance_email,
        finance_credit_limit: finance_credit_limit,
        finance_debit_details: finance_debit_details,
        billing_name: billing_name,
        billing_position: billing_position,
        billing_number: billing_number,
        billing_mobile: billing_mobile,
        billing_email: billing_email,
        services: allServices,
        insertOn: insertOn,
        login_random: randomString,

        insertBy: req.session.user.id,
      });
      const clietLogin = await loginModel.create({
        email: contract_email,
        password: hashedPassword,
        role: "Client",
        login_random: randomString,
      });

      req.flash("success", "data post successfully");
      return res.redirect("/admin/clientList");
    } else {
      req.flash("error", "email already in database");
      console.log("email already in the database");
      return res.redirect("/admin/clientList");
    }
  } catch (error) {
    req.flash("error", "something went wrong");

    console.log(error);
    return res.redirect("/login");
  }
};

exports.clientList = async (req, res) => {
  try {
    const clientData = await clientModel.findAll({ where: { isDeleted: 0 } });
    const session = await loginModel.findOne({
      where: { role: req.session.user.role },
    });

    return res.render("./general/clientList.ejs", {
      session: session,
      clientData: clientData,
      messages: req.flash(),
    });
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.clientEdit = async (req, res) => {
  try {
    const encoded = atob(req.params.id);
    console.log("encoded", encoded);
    const data = await clientModel.findOne({ where: { id: encoded } });
    const session = await loginModel.findOne({
      where: { role: req.session.user.role },
    });

    if (!data) {
      req.flash("error", "data not found");
      return res.redirect("/admin/clientList");
    } else {
      // console.log('data-------------------------->',data)
      const json_data = JSON.parse(data.dataValues.services);
      // console.log(service_data)
      // const json_data=JSON.parse(service_data)
      console.log(json_data);

      console.log("data", json_data);
      // req.flash('success','all data fetched')
      return res.render("./general/clientEdit.ejs", {
        session: session,
        data: data,
        json_data: json_data,
        messages: req.flash(),
      });
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "something went wrong");
    return res.redirect("/login");
  }
};

exports.clientDelete = async (req, res) => {
  try {
    const encoded = atob(req.params.id);
    const data = await clientModel.findOne({ where: { id: encoded } });
    const dataDelete = await clientModel.update(
      { isDeleted: 1 },
      { where: { id: encoded } }
    );

    // Set a success flash message using req.flash
    req.flash("success", `${data.client_name} is deleted successfully`);

    // Redirect to the appropriate URL
    return res.redirect("/admin/clientList");
  } catch (e) {
    // Set an error flash message using req.flash
    req.flash("error", "Deletion failed");

    // Redirect to the appropriate URL
    return res.redirect("/login");
  }
};

exports.approveBtn = async (req, res) => {
  try {
    const encoded = atob(req.params.id);
    const data = await clientModel.findOne({ where: { id: encoded } });
    console.log(data);
    if (data.admin_status == "Pending") {
      const updatebtn = await clientModel.update(
        { admin_status: "Approved" },
        {
          where: {
            id: encoded,
          },
        }
      );
      console.log(updatebtn);
      req.flash("success", `${data.client_name} is approved`);
      return res.redirect("/admin/clientList");
    } else if (data.admin_status == "Approved") {
      const updatebtn = await clientModel.update(
        { admin_status: "Pending" },
        {
          where: {
            id: encoded,
          },
        }
      );
      req.flash("success", `${data.client_name} Is Pending`);
      return res.redirect("/admin/clientList");
    } else {
      console.log("error on update");
      req.flash("error", "Something Went Wrong");
      return res.redirect("/admin/clientList");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.clientEdit1 = async (req, res) => {
  try {
    const enco = btoa(req.params.id);
    console.log("enco------->", enco);

    const {
      client_name,
      type,
      registered_address,
      contract_name,
      contract_position,
      contract_number,
      contract_mobile,
      contract_email,
      website,
      industry,
      vat_number,
      registration_no,
      client_logo,
      img_url,
      subscrption_level_agreed,
      payroll_subsribe,
      employement_contract,
      service,
      services,
      finance_name,
      finance_position,
      finance_number,
      finance_mobile,
      finance_email,
      finance_credit_limit,
      finance_debit_details,
      billing_name,
      billing_position,
      billing_number,
      billing_mobile,
      billing_email,
    } = req.body;
    const checkData = await loginModel.findOne({
      where: { email: contract_email },
    });
    const datacheckemail = await clientModel.findOne({
      where: { id: req.params.id },
    });
    if (datacheckemail.contract_email == req.body.contract_email) {
      console.log("email not changed");
    } else {
      const checkD = await loginModel.findOne({
        where: { email: contract_email },
      });
      if (!checkD) {
        console.log("everything Okkk");
      } else {
        req.flash("error", "Change Email Email Already Exist");
        return res.redirect(`/admin/clientEdit/${enco}`);
      }
    }

    if (!checkData) {
      if (req.file) {
        const { filename, originalname } = req.file;
        const allServices = {
          service_name: req.body.service_name,
          service_position: req.body.service_position,
          service_number: req.body.service_number,
          service_mobile: req.body.service_mobile,
          service_email: req.body.service_email,
          service_address: req.body.service_address, // Corrected property name
        };

        const serviceDataJSON = JSON.stringify(allServices);
        const newBody = {
          client_name: client_name,
          type: type,
          registered_address: registered_address,
          contract_name: contract_name,
          contract_position: contract_position,
          contract_number: contract_number,
          contract_mobile: contract_mobile,
          contract_email: contract_email,
          website: website,
          industry: industry,
          vat_number: vat_number,
          registration_no: registration_no,
          client_logo: filename,
          img_url: img_url,
          subscrption_level_agreed: subscrption_level_agreed,
          payroll_subsribe: payroll_subsribe,
          employement_contract: employement_contract,
          service: service,
        };
        const data = await clientModel.findOne({
          where: { id: req.params.id },
        });
        console.log("client edit 1------------->", data);
        const updateForm1 = await clientModel.update(newBody, {
          where: { id: req.params.id },
        });
        const updateLogin = await loginModel.update(
          { email: contract_email },
          { where: { login_random: data.login_random } }
        );

        req.flash("success", "Data Update Successfully");
        return res.redirect(`/admin/clientEdit/${enco}`);
      } else {
        const newBody = req.body;
        const data = await clientModel.findOne({
          where: { id: req.params.id },
        });
        console.log("client edit 1------------->", data);
        const updateForm1 = await clientModel.update(newBody, {
          where: { id: req.params.id },
        });
        const updateLogin = await loginModel.update(
          { email: contract_email },
          { where: { login_random: data.login_random } }
        );
        console.log("this is updateform 1--------->", updateForm1);
        req.flash("success", "Data Update Successfully");

        return res.redirect(`/admin/clientEdit/${enco}`);
      }
    }
    if (checkData.email == contract_email) {
      if (req.file) {
        const { filename, originalname } = req.file;
        const allServices = {
          service_name: req.body.service_name,
          service_position: req.body.service_position,
          service_number: req.body.service_number,
          service_mobile: req.body.service_mobile,
          service_email: req.body.service_email,
          service_address: req.body.service_address, // Corrected property name
        };

        const serviceDataJSON = JSON.stringify(allServices);
        const newBody = {
          client_name: client_name,
          type: type,
          registered_address: registered_address,
          contract_name: contract_name,
          contract_position: contract_position,
          contract_number: contract_number,
          contract_mobile: contract_mobile,
          // contract_email: contract_email,
          website: website,
          industry: industry,
          vat_number: vat_number,
          registration_no: registration_no,
          client_logo: filename,
          img_url: img_url,
          subscrption_level_agreed: subscrption_level_agreed,
          payroll_subsribe: payroll_subsribe,
          employement_contract: employement_contract,
          service: service,
        };
        const data = await clientModel.findOne({
          where: { id: req.params.id },
        });
        console.log("client edit 1------------->", data);
        const updateForm1 = await clientModel.update(newBody, {
          where: { id: req.params.id },
        });
        // const updateLogin=await loginModel.update({email:contract_email},{where:{login_random:data.login_random}})
        req.flash("success", "Data Update Successfully");
        return res.redirect(`/admin/clientEdit/${enco}`);
      } else {
        const newBody = req.body;
        const data = await clientModel.findOne({
          where: { id: req.params.id },
        });
        console.log("client edit 1------------->", data);
        const updateForm1 = await clientModel.update(newBody, {
          where: { id: req.params.id },
        });
        const updateLogin = await loginModel.update(
          { email: contract_email },
          { where: { login_random: data.login_random } }
        );
        console.log("this is updateform 1--------->", updateForm1);
        req.flash("success", "Data Update Successfully");

        return res.redirect(`/admin/clientEdit/${enco}`);
      }
    } else {
      if (req.file) {
        const { filename, originalname } = req.file;
        const allServices = {
          service_name: req.body.service_name,
          service_position: req.body.service_position,
          service_number: req.body.service_number,
          service_mobile: req.body.service_mobile,
          service_email: req.body.service_email,
          service_address: req.body.service_address, // Corrected property name
        };

        const serviceDataJSON = JSON.stringify(allServices);
        const newBody = {
          client_name: client_name,
          type: type,
          registered_address: registered_address,
          contract_name: contract_name,
          contract_position: contract_position,
          contract_number: contract_number,
          contract_mobile: contract_mobile,
          contract_email: contract_email,
          website: website,
          industry: industry,
          vat_number: vat_number,
          registration_no: registration_no,
          client_logo: filename,
          img_url: img_url,
          subscrption_level_agreed: subscrption_level_agreed,
          payroll_subsribe: payroll_subsribe,
          employement_contract: employement_contract,
          service: service,
        };
        const data = await clientModel.findOne({
          where: { id: req.params.id },
        });
        console.log("client edit 1------------->", data);
        const updateForm1 = await clientModel.update(newBody, {
          where: { id: req.params.id },
        });
        const updateLogin = await loginModel.update(
          { email: contract_email },
          { where: { login_random: data.login_random } }
        );
        req.flash("success", "Data Update Successfully");
        return res.redirect(`/admin/clientEdit/${enco}`);
      } else {
        const newBody = req.body;
        const data = await clientModel.findOne({
          where: { id: req.params.id },
        });
        console.log("client edit 1------------->", data);
        const updateForm1 = await clientModel.update(newBody, {
          where: { id: req.params.id },
        });
        const updateLogin = await loginModel.update(
          { email: contract_email },
          { where: { login_random: data.login_random } }
        );
        console.log("this is updateform 1--------->", updateForm1);
        req.flash("success", "Data Update Successfully");

        return res.redirect(`/admin/clientEdit/${enco}`);
      }
    }
  } catch (error) {
    req.flash("error", "Something Went Wrong");

    console.log(error);
    return res.redirect("/login");
  }
};
exports.clientEdit2 = async (req, res) => {
  try {
    const encoded = btoa(req.params.id);
    const newData = req.body;
    const data = await clientModel.findOne({ where: { id: req.params.id } });
    console.log("data2------------------>", data);
    const updateForm2 = await clientModel.update(newData, {
      where: { id: req.params.id },
    });
    req.flash("success", "Form Data Updated");
    return res.redirect(`/admin/clientEdit/${encoded}`);
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.clientEdit3 = async (req, res) => {
  try {
    const encoded = btoa(req.params.id);
    const newData = req.body;
    const data = await clientModel.findOne({ where: { id: req.params.id } });
    console.log("data3------------------>", data);
    const updateForm2 = await clientModel.update(newData, {
      where: { id: req.params.id },
    });
    req.flash("success", "Form Data Updated");
    return res.redirect(`/admin/clientEdit/${encoded}`);
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

// department controller start

exports.adminDepartment = async (req, res) => {
  try {
    const data = await departmentModel.findAll({ where: { status: 1 } });
    const session = await loginModel.findOne({
      where: { role: req.session.user.role },
    });

    // console.log("department_data------------>",data)
    return res.render("./admin/adminDepartment.ejs", {
      session: session,
      data: data,
      messages: req.flash(),
    });
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.Save_m_departments = async (req, res) => {
  try {
    const { dep_code, department_name } = req.body;
    const department_Check = await departmentModel.findOne({
      where: {
        [Sequelize.Op.or]: [
          { dep_code: dep_code },
          { department_name: department_name },
        ],
      },
    });
    console.log("department_Check--------------->", department_Check);
    if (!department_Check) {
      const data = await departmentModel.create({
        dep_code: dep_code,
        department_name: department_name,
      });
      req.flash("success", "Department Created Successfully");
      // console.log("department_data---------->",data)
      return res.redirect("/admin/adminDepartment");
    } else {
      console.log("this department already in the database ");
      req.flash("error", "Already In Database");
      // alert('already in database')
      return res.redirect("/admin/adminDepartment");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.editDepartment = async (req, res) => {
  try {
    const encoded = atob(req.params.id);
    const editData = await departmentModel.findOne({
      where: { id: encoded },
    });
    const data = await departmentModel.findAll({ where: { status: 1 } });
    const session = await loginModel.findOne({
      where: { role: req.session.user.role },
    });

    console.log("edit data-------------->", editData);
    return res.render("./admin/editDepartment.ejs", {
      editData: editData,
      session: session,
      data: data,
      messages: req.flash(),
    });
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.editDepartment1 = async (req, res) => {
  try {
    const newData = {
      dep_code: req.body.dep_code,
      department_name: req.body.department_name,
    };
    const data = await departmentModel.findOne({
      where: { id: req.params.id },
    });
    if (data) {
      if (
        data.dep_code != newData.dep_code ||
        data.department_name != newData.department_name
      ) {
        const department_Check = await departmentModel.findOne({
          where: {
            [Sequelize.Op.or]: [
              { dep_code: req.body.dep_code },
              { department_name: req.body.department_name },
            ],
          },
        });
        if (!department_Check) {
          const updateData = await departmentModel.update(newData, {
            where: { id: req.params.id },
          });
          req.flash("success", "Department Data Updated");
          return res.redirect("/admin/adminDepartment");
        } else {
          req.flash("error", "Data Already In Database");
          return res.redirect("/admin/adminDepartment");
        }
      } else {
        req.flash("error", " Data Is It Is");
        return res.redirect("/admin/adminDepartment");
      }
    } else {
      console.log("data not Submitted");
      return res.redirect("/admin/adminDepartment");
    }
  } catch (error) {
    console.log(error);
    return res.redirect("/login");
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const encoded = atob(req.params.id);
    const data = await departmentModel.findOne({
      where: { id: encoded },
    });
    const datadestroy = await departmentModel.destroy({
      where: { id: encoded },
    });
    req.flash("seccess", `${data.department_name} Is Deleted`);
    return res.redirect("/admin/adminDepartment");
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.editCompany = async (req, res) => {
  try {
    const session = await loginModel.findOne({
      where: { role: req.session.user.role },
    });

    const findCompany = await companyModel.findOne({
      where: { createdBy: req.session.user.id },
    });

    console.log(findCompany);
    return res.render("./admin/editCompany.ejs", {
      session: session,
      findCompany: findCompany,
      messages: req.flash(),
    });
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.editCompany1 = async (req, res) => {
  try {
    const {
      company_name,
      shrtname,
      proprietor,
      phone,
      phone2,
      email,
      email2,
      pin_code,
      place,
      state,
      state_code,
      company_address,
      gst_applicable,
      address,
      gst_no,
      pan_no,
      website,
      password,
      wp_api_key,
      distance_api_key,
      smtp_host,
      smtp_port,
      smtp_sender_id,
      smtp_password,
      smtp_secure,
      smtp_name,
      default_cc_mailid,
    } = req.body;

    if (req.file) {
      const { filename, originalname } = req.file;
      const newData = {
        company_name: company_name,
        shrtname: shrtname,
        proprietor: proprietor,
        phone: phone,
        phone2: phone2,
        email: email,
        email2: email2,
        state: state,
        state_code: state_code,
        address: address,
        company_logo: filename,
        gst_applicable: gst_applicable,
        address: address,
        gst_no: gst_no,
        pan_no: pan_no,
        website: website,
        password: password,
        wp_api_key: wp_api_key,
        distance_api_key: distance_api_key,
        smtp_host: smtp_host,
        smtp_port: smtp_port,
        smtp_sender_id: smtp_sender_id,
        smtp_password: smtp_password,
        smtp_secure: smtp_secure,
        smtp_name: smtp_name,
        default_cc_mailid: default_cc_mailid,
        createdBy: req.session.user.id,
      };

      const data = await companyModel.findOne({ where: { id: req.params.id } });
      console.log("company post api----------->", data);
      console.log("company post api1----------->", req.body);
      if (data) {
        console.log("this is company post api");
        const updateData = await companyModel.update(newData, {
          where: { id: req.params.id },
        });
        req.flash("success", "Company Data Updated");
        return res.redirect("/admin/editCompany");
      } else {
        console.log("data not submited");
        req.flash("error", "Data Not Updated");
        return res.redirect("/admin/editCompany");
      }
    } else {
      const newData = req.body;
      const data = await companyModel.findOne({ where: { id: req.params.id } });
      console.log("company post api----------->", data);
      console.log("company post api1----------->", req.body);
      if (data) {
        console.log("this is company post api");
        const updateData = await companyModel.update(newData, {
          where: { id: req.params.id },
        });
        req.flash("success", "Company Data Updated");
        return res.redirect("/admin/editCompany");
      } else {
        console.log("data not submited");
        req.flash("error", "Data Not Updated");
        return res.redirect("/admin/editCompany");
      }
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

// fin_years controller start

exports.fin_years = async (req, res) => {
  try {
    const session = await loginModel.findOne({
      where: { role: req.session.user.role },
    });

    const year_Data = await fin_yearsModel.findAll({ where: { status: 1 } });

    return res.render("./admin/fin_years.ejs", {
      session: session,
      year_Data: year_Data,
      messages: req.flash(),
    });
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.Save_fin_year = async (req, res) => {
  try {
    const yearBody = req.body;
    const checkValue = await fin_yearsModel.findOne({
      where: { year_name: yearBody.year_name },
    });
    console.log("checkvalue------------------->", checkValue);
    if (!checkValue || undefined || null) {
      const addFinData = await fin_yearsModel.create({
        year_name: yearBody.year_name,
        year_start_date: yearBody.year_start_date,
        year_end_date: yearBody.year_end_date,
      });
      console.log("finYear added;");
      req.flash("success", `${addFinData.year_name} Financial Data Create`);
      return res.redirect("/admin/fin_years");
    } else {
      console.log("data not added");
      req.flash("error", "Financial Data Not Created");
      return res.redirect("/admin/fin_years");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.edit_fin_year = async (req, res) => {
  try {
    const encoded = atob(req.params.id);
    const session = await loginModel.findOne({
      where: { role: req.session.user.role },
    });

    const data = await fin_yearsModel.findAll({ where: { status: 1 } });
    const fin_year_data = await fin_yearsModel.findOne({
      where: { id: encoded },
    });
    console.log("fin_year------------------>0", fin_year_data);

    return res.render("./admin/edit_fin_year.ejs", {
      session: session,
      data: data,
      fin_year_data: fin_year_data,
      messages: req.flash(),
    });
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.edit_fin_year1 = async (req, res) => {
  try {
    const newData = req.body;
    const data = await fin_yearsModel.findOne({ where: { id: req.params.id } });
    if (data) {
      const updateData = await fin_yearsModel.update(newData, {
        where: { id: req.params.id },
      });
      req.flash("success", "Edit Financial Data");
      return res.redirect("/admin/fin_years");
    } else {
      console.log("data not submited");
      req.flash("error", "Data Not Edited");
      return res.redirect("/admin/fin_years");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};
exports.Delete_fin_year = async (req, res) => {
  try {
    const encoded = atob(req.params.id);
    const data = await fin_yearsModel.destroy({ where: { id: encoded } });

    req.flash("success", "Data Deleted Successfully");
    return res.redirect("/admin/fin_years");
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};
// fin_years controller end

// job controller start

exports.g_jobpage = async (req, res) => {
  try {
    const data = await g_jobModel.findAll({ where: { status: 1 } });
    const session = await loginModel.findOne({
      where: { role: req.session.user.role },
    });

    return res.render("./general/jobTitle.ejs", {
      session: session,
      data: data,
      messages: req.flash(),
    });
  } catch (error) {
    console.log(error);
    req.flash("success", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.g_jobAdd = async (req, res) => {
  try {
    const data = await g_jobModel.findOne({
      where: { job_title_name: req.body.job_title_name },
    });
    if (!data) {
      const addJob = await g_jobModel.create({
        job_title_name: req.body.job_title_name,
      });
      req.flash("success", "Job created");

      return res.redirect("/admin/g_jobpage");
    } else {
      req.flash("error", "Job Already In Database");
      console.log("job not added");
      return res.redirect("/admin/g_jobpage");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.jobTItleEdit = async (req, res) => {
  try {
    const enc = atob(req.params.id);
    const session = await loginModel.findOne({
      where: { role: req.session.user.role },
    });
    const encoded = atob(req.params.id);

    const data = await g_jobModel.findAll({ where: { status: 1 } });
    const editJob = await g_jobModel.findOne({ where: { id: enc } });
    return res.render("./general/jobTItleEdit.ejs", {
      session: session,
      data: data,
      editJob: editJob,
      messages: req.flash(),
    });
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.g_jobEdit = async (req, res) => {
  try {
    const newData = req.body;
    const data = await g_jobModel.findOne({ where: { id: req.params.id } });
    if (data) {
      if (data.job_title_name != newData.job_title_name) {
        const checkJob = await g_jobModel.findOne({
          where: { job_title_name: newData.job_title_name },
        });
        if (!checkJob) {
          const updateData = await g_jobModel.update(newData, {
            where: { id: req.params.id },
          });
          req.flash("success", "Job Updated..");
          return res.redirect("/admin/g_jobpage");
        } else {
          req.flash("error", "Data Already In Database");
          return res.redirect("/admin/g_jobpage");
        }
      } else {
        req.flash("error", "Data Is It is & Not Changed");
        return res.redirect("/admin/g_jobpage");
      }
    } else {
      req.flash("error", "Job is Not Found");
      return res.redirect("/admin/g_jobpage");
    }
    //   if (data) {

    //     const updateData = await g_jobModel.update(newData, { where: { id: req.params.id } })
    //     return res.redirect('/admin/g_jobpage')
    // }else{
    //     console.log('data not submited')
    //     return res.redirect('/admin/g_jobpage')
    // }
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};
exports.Delete_jobtitles = async (req, res) => {
  try {
    const data = await g_jobModel.findOne({ where: { id: req.params.id } });
    if (data) {
      const dataDestroy = await g_jobModel.destroy({
        where: { id: req.params.id },
      });
      req.flash("success", `${data.job_title_name} Is Deleted`);
      return res.redirect("/admin/g_jobpage");
    } else {
      req.flash("error", "Data Not Deleted");
      return res.redirect("/admin/g_jobpage");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "SomeOne Have This Job");
    return res.redirect("/admin/g_jobpage");
  }
};

// job controller end

// advert_ref controller start

exports.m_industry = async (req, res) => {
  try {
    const session = await loginModel.findOne({
      where: { role: req.session.user.role },
    });

    const data = await g_industryModel.findAll({ where: { status: 1 } });
    return res.render("./general/industry.ejs", {
      session: session,
      data: data,
      messages: req.flash(),
    });
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.Save_m_industry = async (req, res) => {
  try {
    const data = await g_industryModel.findOne({
      where: { industry_name: req.body.industry_name },
    });
    if (!data) {
      const addIndustry = await g_industryModel.create({
        industry_name: req.body.industry_name,
      });
      req.flash("success", "New Industry Created");
      return res.redirect("/admin/m_industry");
    } else {
      console.log("industry not added");
      req.flash("error", "Data Not Posted");
      return res.redirect("/admin/m_industry");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.edit_m_industry = async (req, res) => {
  try {
    const encoded = atob(req.params.id);

    const session = await loginModel.findOne({
      where: { role: req.session.user.role },
    });

    const data = await g_industryModel.findAll({ where: { status: 1 } });
    const editInd = await g_industryModel.findOne({
      where: { id: encoded },
    });
    return res.render("./general/industryEdit.ejs", {
      session: session,
      data: data,
      editInd: editInd,
      messages: req.flash(),
    });
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.g_industryEdit = async (req, res) => {
  try {
    const newData = req.body;
    const data = await g_industryModel.findOne({
      where: { id: req.params.id },
    });
    console.log("industry Data---------->", data);
    if (data) {
      const industry_data = await g_industryModel.findOne({
        where: { industry_name: req.body.industry_name },
      });
      console.log("--------------", industry_data);
      if (!industry_data) {
        const updateData = await g_industryModel.update(newData, {
          where: { id: req.params.id },
        });
        req.flash("success", `${data.industry_name} Is Updated`);
        return res.redirect("/admin/m_industry");
      } else {
        if (industry_data.industry_name == req.body.industry_name) {
          console.log("Data As Is It Is");
          req.flash('error','Data Already In Database')
          return res.redirect('/admin/m_industry')
        }
      }
    } else {
      console.log("data not submited");
      req.flash("error", `${data.industry_name} Not Updated`);
      return res.redirect("/login");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.Delete_m_industry = async (req, res) => {
  try {
    const encoded = atob(req.params.id);

    const data1 = await g_industryModel.findOne({
      where: { id: encoded },
    });
    const data = await g_industryModel.destroy({
      where: { id: encoded },
    });
    req.flash("success", `${data1.industry_name} Is Deleted`);
    return res.redirect("/admin/m_industry");
  } catch (error) {
    console.log(error);
    req.flash("error", "This Is Conneted Somewhere");
    return res.redirect("/admin/m_industry");
  }
};

// advert_ref controller end

// Skill controller start

exports.m_skillPage = async (req, res) => {
  try {
    const session = await loginModel.findOne({
      where: { role: req.session.user.role },
    });

    const data = await skillModel.findAll({ where: { status: 1 } });
    return res.render("./general/skillsPage.ejs", {
      session: session,
      data: data,
      messages: req.flash(),
    });
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.Save_m_skills = async (req, res) => {
  try {
    console.log("skilll post --------->", req.body);
    const data = await skillModel.findOne({
      where: { skill_name: req.body.skill_name },
    });
    if (!data) {
      const addSkill = await skillModel.create({
        skill_name: req.body.skill_name,
      });
      req.flash("success", "New Skill Added");
      return res.redirect("/admin/m_skillPage");
    } else {
      console.log("industry not added");
      req.flash("error", "Data Already In Database");
      return res.redirect("/admin/m_skillPage");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.edit_m_skills = async (req, res) => {
  try { 
    const encoded=atob(req.params.id)
    const session = await loginModel.findOne({
      where: { role: req.session.user.role },
    });

    const data = await skillModel.findAll({ where: { status: 1 } });
    const skill = await skillModel.findOne({ where: { id:encoded } });
    return res.render("./general/skillPageEdit.ejs", {
      session: session,
      data: data,
      skill: skill,
      messages: req.flash(),
    });
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.edit_m_skills1 = async (req, res) => {
  try {
    const newData = req.body;
    const data = await skillModel.findOne({ where: { id: req.params.id } });
    console.log('Data------>0',data)
    if (data) {
      if(data.skill_name==req.body.skill_name){
        console.log('data is it is')
        return res.redirect('/admin/m_skillPage')
      }else{
        const checkSkill=await skillModel.findOne({where:{skill_name:req.body.skill_name}})
        if(!checkSkill){
          const updateData = await skillModel.update(newData, {
            where: { id: req.params.id },
          });
          req.flash("success", `${data.skill_name} Is Skill Updated`);
          return res.redirect("/admin/m_skillPage");
        }else{
          req.flash('error','Skill Already Exist Change Skill Name')
          return res.redirect('/admin/m_skillPage')
        }
      }
    } else {
      console.log("data not submited");
      req.flash("error", `Data Is Not Updated`);
      return res.redirect("/admin/m_skillPage");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.Delete_m_skills = async (req, res) => {
  try {
    const encoded=atob(req.params.id)
    const d = await skillModel.findOne({ where: { id: encoded } });
    const data = await skillModel.destroy({ where: { id: encoded } });
    req.flash("success", `${d.skill_name} Is Deleted`);
    return res.redirect("/admin/m_skillPage");
  } catch (error) {
    console.log(error);
    req.flash("error", "This Skill is Connected Somewhere");
    return res.redirect("/admin/m_skillPage");
  }
};

// Skill controller end

// advert_ref controller start

exports.ad_ref_page = async (req, res) => {
  try {
    const session = await loginModel.findOne({
      where: { role: req.session.user.role },
    });

    const data = await advert_refModel.findAll({ where: { status: 1 } });
    return res.render("./general/advert_ref.ejs", {
      session: session,
      data: data,
      messages: req.flash(),
    });
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.Save_m_advert_ref = async (req, res) => {
  try {
    
    console.log("skilll post --------->", req.body);
    const data = await advert_refModel.findOne({
      where: { ad_ref_name: req.body.ad_ref_name },
    });
    if (!data) {
      const addAdvRef = await advert_refModel.create({
        ad_ref_name: req.body.ad_ref_name,
      });
      req.flash("success", `${req.body.ad_ref_name} is Added Successfully`);
      return res.redirect("/admin/ad_ref_page");
    } else {
      console.log("industry not added");
      req.flash("error", "Can Not Created");
      return res.redirect("/admin/ad_ref_page");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.edit_m_advertPage = async (req, res) => {
  try {
    const session = await loginModel.findOne({
      where: { role: req.session.user.role },
    });
    const encoded=atob(req.params.id)

    const data = await advert_refModel.findAll({ where: { status: 1 } });
    const adv = await advert_refModel.findOne({ where: { id: encoded } });
    return res.render("./general/advPageEdit.ejs", {
      session: session,
      data: data,
      adv: adv,
      messages: req.flash(),
    });
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.edit_m_advert_ref = async (req, res) => {
  try {
    // const encoded=atob(req.params.id)
    const newData = req.body;
    const data = await advert_refModel.findOne({
      where: { id: req.params.id },
    });
    const data1 = await advert_refModel.findOne({
      where: { ad_ref_name: req.body.ad_ref_name },
    });
    console.log(data);
    console.log("i", data.ad_ref_name);
    console.log(data1);
    console.log(req.body.ad_ref_name);
    if (!data1) {
      const updateData = await advert_refModel.update(newData, {
        where: { id: req.params.id },
      });
      req.flash("success", `${data.ad_ref_name} Is Updated`);
      return res.redirect("/admin/ad_ref_page");
    } else {
      console.log("data not submited");
      req.flash(
        "error",
        `${req.body.ad_ref_name} Is Not Updated Or Already In Database`
      );

      return res.redirect("/admin/ad_ref_page");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.Delete_m_advert_ref = async (req, res) => {
  const encoded=atob(req.params.id)
  const d = await advert_refModel.findOne({ where: { id: encoded } });
  try {
    const data = await advert_refModel.destroy({
      where: { id: encoded},
    });
    req.flash("success", `${d.ad_ref_name} Is Deleted SuccessFully`);
    return res.redirect("/admin/ad_ref_page");
  } catch (error) {
    console.log(error);
    req.flash("error", `${d.ad_ref_name} Not Deleted`);
    return res.redirect("/admin/ad_ref_page");
  }
};

// advert_ref controller end

// Employee controller start

exports.adminEmployee = async (req, res) => {
  try {
    const session = await loginModel.findOne({
      where: { role: req.session.user.role },
    });

    const EmpData = await EmployeeModel.findAll({});
    return res.render("./admin/adminEmployee.ejs", {
      session: session,
      EmpData: EmpData,
      messages: req.flash(),
    });
  } catch (error) {
    console.log(error);
  }
};

exports.adminAddEmployee = async (req, res) => {
  try {
    const session = await loginModel.findOne({
      where: { role: req.session.user.role },
    });

    const EmpData = await EmployeeModel.findAll({ where: { status: 1 } });
    const department = await departmentModel.findAll({ where: { status: 1 } });
    const employees = await EmployeeModel.findAll({
      where: { status: 1, is_report_auth: "Y" },
    });
    return res.render("./admin/adminAddEmployee.ejs", {
      session,
      session,
      EmpData: EmpData,
      department: department,
      employees: employees,
      messages: req.flash(),
    });
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.AdminAddEmployee1 = async (req, res) => {
  try {
    const employeeBody = req.body;

    const hashedPassword = md5(employeeBody.password);
    const { originalname, filename } = req.file;
    const checkEmployee = await EmployeeModel.findOne({
      where: { email: employeeBody.email },
    });
    if (!checkEmployee) {
      function generateRandomString(length) {
        const letters = "abcdefghijklmnopqrstuvwxyz";
        let randomString = "";

        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * letters.length);
          randomString += letters.charAt(randomIndex);
        }

        return randomString;
      }

      const now = new Date();
      const dateString = now.toISOString().replace(/[^0-9]/g, "");
      const randomStringLength = dateString.length;

      const randomString =
        generateRandomString(randomStringLength) + dateString;
      const findUser = await loginModel.findOne({
        where: { email: employeeBody.email },
      });
      if (!findUser) {
        const data = await EmployeeModel.create({
          fname: employeeBody.fname,
          lname: employeeBody.lname,
          em_username: employeeBody.em_username,
          contact: employeeBody.contact,
          em_address: employeeBody.em_address,
          email: employeeBody.email,
          dep_id: employeeBody.dep_id,
          is_report_auth: employeeBody.is_report_auth,
          manager_id: employeeBody.manager_id,
          role: employeeBody.role,
          password: hashedPassword,
          image_url: filename,
          login_random: randomString,
        });
        const Login_data = await loginModel.create({
          email: employeeBody.email,
          password: hashedPassword,
          role: "Admin",
          login_random: randomString,
        });
        console.log("employeeData--------->", data);
        req.flash("success", "User Added Successfully");
        return res.redirect("/admin/adminAddEmployee");
      } else {
        req.flash("error", "Change email");
        return res.redirect("/admin/adminAddEmployee");
      }
    } else {
      console.log("data already added");
      req.flash("error", "Data Is Already In Database");
      return res.redirect("/admin/adminAddEmployee");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/admin/adminAddEmployee");
  }
};

exports.Reset_Password = async (req, res) => {
  try {
    const employeeBody = req.body;
    console.log("employeeBody reset password----------->0", employeeBody);
    const data = await EmployeeModel.findOne({ where: { id: req.params.id } });
    console.log("data--------->", data.password);
    if (md5(employeeBody.old) == data.password) {
      const hashpassword = md5(employeeBody.new1);
      const updatedData = {
        password: hashpassword,
      };
      console.log("updatedata", updatedData);
      const updatepassword = await EmployeeModel.update(updatedData, {
        where: { id: req.params.id },
      });
      const loginEmployee = await loginModel.update(updatedData, {
        where: { login_random: data.login_random },
      });
      console.log("password updated");
      req.flash("success", "Password Updated.");
      return res.redirect("/admin/adminEmployee");
    } else {
      console.log("old password is wrong");
      req.flash("error", "Old Password Is Wrong");
      return res.redirect("/admin/adminEmployee");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};
exports.employeeView = async (req, res) => {
  try {
    const encoded = atob(req.params.id);
    console.log(encoded);
    const session = await loginModel.findOne({
      where: { role: req.session.user.role },
    });

    console.log("data");
    const data = await EmployeeModel.findOne({ where: { id: encoded } });
    console.log("--------------employeeviewdata----------->", data);

    return res.render("./general/employeeView.ejs", {
      session: session,
      d: data,
      messages: req.flash(),
    });
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};
exports.employeeViewEdit = async (req, res) => {
  try {
    const {
      status,
      em_username,
      fname,
      lname,
      is_report_auth,
      contact,
      em_address,
      email,
      role,
      image_url,
    } = req.body;
    const find = await EmployeeModel.findOne({ where: { id: req.params.id } });
    if (find.email == req.body.email) {
      if (req.file) {
        const { filename } = req.file;
        const newData = {
          status: status,
          em_username: em_username,
          fname: fname,
          lname: lname,
          is_report_auth: is_report_auth,
          contact: contact,
          em_address: em_address,
          email: email,
          role: role,
          image_url: filename,
        };
        const data = await EmployeeModel.findOne({
          where: { id: req.params.id },
        });
        if (data) {
          const updateData = await EmployeeModel.update(newData, {
            where: { id: req.params.id },
          });
          req.flash("success", "Data Update Successfully");
          return res.redirect("/admin/adminEmployee");
        } else {
          console.log("data not submited");
          req.flash("error", "Data Not Updated");
          return res.redirect("/admin/adminEmployee");
        }
      } else {
        const newData = {
          status: status,
          em_username: em_username,
          fname: fname,
          lname: lname,
          is_report_auth: is_report_auth,
          contact: contact,
          em_address: em_address,
          email: email,
          role: role,
        };
        const data = await EmployeeModel.findOne({
          where: { id: req.params.id },
        });
        if (data) {
          const updateData = await EmployeeModel.update(newData, {
            where: { id: req.params.id },
          });
          req.flash("success", "Data Updated Successfully");
          return res.redirect("/admin/adminEmployee");
        } else {
          console.log("data not submited");
          req.flash("error", "Data Not Updated");
          return res.redirect("/admin/adminEmployee");
        }
      }
    } else {
      const findInLogin = await loginModel.findOne({
        where: { email: req.body.email },
      });
      console.log("0------------------------>", find);
      console.log(findInLogin);
      if (!findInLogin) {
        if (req.file) {
          const { filename } = req.file;
          const newData = {
            status: status,
            em_username: em_username,
            fname: fname,
            lname: lname,
            is_report_auth: is_report_auth,
            contact: contact,
            em_address: em_address,
            email: email,
            role: role,
            image_url: filename,
          };
          const data = await EmployeeModel.findOne({
            where: { id: req.params.id },
          });
          if (data) {
            const updateData = await EmployeeModel.update(newData, {
              where: { id: req.params.id },
            });
            const updateLo = await loginModel.update(
              { email: email },
              { where: { login_random: data.login_random } }
            );
            req.flash("success", "Data Update Successfully");
            return res.redirect("/admin/adminEmployee");
          } else {
            console.log("data not submited");
            req.flash("error", "Data Not Updated");
            return res.redirect("/admin/adminEmployee");
          }
        } else {
          const newData = {
            status: status,
            em_username: em_username,
            fname: fname,
            lname: lname,
            is_report_auth: is_report_auth,
            contact: contact,
            em_address: em_address,
            email: email,
            role: role,
          };
          const data = await EmployeeModel.findOne({
            where: { id: req.params.id },
          });
          if (data) {
            const updateData = await EmployeeModel.update(newData, {
              where: { id: req.params.id },
            });
            const updateLo = await loginModel.update(
              { email: email },
              { where: { login_random: data.login_random } }
            );

            req.flash("success", "Data Updated Successfully");
            return res.redirect("/admin/adminEmployee");
          } else {
            console.log("data not submited");
            req.flash("error", "Data Not Updated");
            return res.redirect("/admin/adminEmployee");
          }
        }
      } else {
        req.flash("error", "Email Already In Database");
        return res.redirect("/admin/adminEmployee");
      }
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

// exports.Reset_Password=async(req,res)=>{
//   try {
//     const data=awa
//   } catch (error) {

//   }
// }
// Employee controller start

exports.candidateList = async (req, res) => {
  try {
    const session = await loginModel.findOne({
      where: { role: req.session.user.role },
    });

    const PData = await clientPersonalModel.findAll({
      where: { adminStatus: "Pending" },
    });
    const AData = await clientPersonalModel.findAll({
      where: { adminStatus: "Approved" },
    });
    const AllData = await clientPersonalModel.findAll({});
    return res.render("./general/candidateList.ejs", {
      session: session,
      PData: PData,
      AData: AData,
      AllData: AllData,
      messages: req.flash(),
    });
  } catch (error) {
    console.log(error);
    req.flash("error", "something went wrong");
    return res.redirect("/login");
  }
};
exports.Reject_accept_candidate = async (req, res) => {
  try {
    const encoded = atob(req.params.id);

    const data = await clientPersonalModel.findOne({
      where: { id: encoded },
    });
    if (data) {
      const approveData = await clientPersonalModel.update(
        { adminStatus: "Rejected" },
        { where: { id: encoded } }
      );
      req.flash("error", `${data.candidate_name} Is Rejected`);
      return res.redirect("/admin/candidateList");
    } else {
      console.log("not updated");
      req.flash("success", "Candidate Not Reject");
      return res.redirect("/admin/candidateList");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};
exports.Approve_accept_candidate = async (req, res) => {
  try {
    const encoded = atob(req.params.id);
    const data = await clientPersonalModel.findOne({
      where: { id: encoded },
    });
    console.log("---------", data);

    const hashedPassword = md5("123456");
    if (data) {
      const approveData = await clientPersonalModel.update(
        { adminStatus: "Approved" },
        { where: { id: encoded } }
      );
      const mailOptions = {
        from: "Support <support@gmail.com>",
        to: data.email_id,
        subject: "you are approved",
        text: `your email is ${data.email_id} and your password is 123456`,
      };
      try {
        await transporter.sendMail(mailOptions);
        const passwordAdd = await clientPersonalModel.update(
          { password: hashedPassword },
          { where: { id: encoded } }
        );
        const checkLogin = await loginModel.findOne({
          where: { email: data.email_id },
        });
        console.log("checkLogin=----------->", checkLogin);
        if (!checkLogin) {
          const loginData = await loginModel.create({
            login_random: data.client_random,
            email: data.email_id,
            role: "Candidate",
            password: hashedPassword,
          });
        } else {
          const updateLogincandidate = await loginModel.update(
            { email: data.email_id, password: hashedPassword },
            { where: { email: checkLogin.email } }
          );
        }
        req.flash("success", `Send Mail To ${data.candidate_name}`);
        return res.redirect("/admin/candidateList"); // Redirect back to the form page
      } catch (error) {
        console.error("Error sending email:", error);
        req.flash("error", `Can Not Send Mail To ${data.candidate_name}`);
        return res.redirect("/admin/candidateList");
      }
    } else {
      console.log("not updated");
      req.flash("error", "Data Not Found");
      return res.redirect("/admin/candidateList");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong ");
    return res.redirect("/login");
  }
};

exports.candidateView = async (req, res) => {
  try {
    const session = await loginModel.findOne({
      where: { role: req.session.user.role },
    });
    const decodedId = atob(req.params.id);
    console.log("------------->", decodedId);

    const data = await clientPersonalModel.findOne({
      where: { id: decodedId },
    });
    // const clientRandom = req.session.user.login_random;

    // Fetch the candidate's personal data
    const data1 = await clientPersonalModel.findOne({
      where: { id: decodedId },
    });
    console.log("-----------data", data);
    // Fetch the JSON data containing skill IDs and parse it
    const skillsData = JSON.parse(data.skills);
    console.log(skillsData);

    // Extract the skill IDs from the JSON

    const skillIds = skillsData.skill_id.map(Number);

    // Fetch the skills based on the extracted skill IDs
    const sData = await skillModel.findAll({ where: { id: skillIds } });

    const industryData = JSON.parse(data.allIndustry);
    const industryIds = industryData.industry_id.map(Number);
    const iData = await g_industryModel.findAll({ where: { id: industryIds } });

    const jobData = JSON.parse(data.jobs);
    const jobIds = jobData.job_id.map(Number);
    const jbData = await g_jobModel.findAll({ where: { id: jobIds } });
    // const sData=null

    // Fetch the candidate's job titles and industries as before
    const JD = await m_clientJobModel.findAll({ where: { id: decodedId } });
    const jData = await Promise.all(
      JD.map(async (item) => {
        const RJob = await g_jobModel.findOne({ where: { id: item.job_id } });
        return RJob;
      })
    );

    const ID = await m_clientModelIndustry.findAll({
      where: { id: decodedId },
    });
    const IData = await Promise.all(
      ID.map(async (item) => {
        const Indust = await g_industryModel.findOne({
          where: { id: item.industry_id },
        });
        return Indust;
      })
    );

    const AD = await advert_refModel.findAll({});
    const AllSkill = await skillModel.findAll({ where: { status: 1 } });
    const Allindusrty = await g_industryModel.findAll({ where: { status: 1 } });
    const AllJob = await g_jobModel.findAll({ where: { status: 1 } });
    console.log("cleint personal data------------>", data);
    return res.render("./general/candidateViewEdit.ejs", {
      session: session,
      data: data,
      data1: data1,
      SD: sData,
      JD: jbData,
      ID: iData,
      AD: AD,
      jobData: jobData,
      skillsData: skillsData,
      AllSkill: AllSkill,
      Allindusrty: Allindusrty,
      AllJob: AllJob,
      messages: req.flash(),
    });
  } catch (error) {
    console.log(error);
    return res.redirect("/login");
  }
};

exports.updateCandidate1 = async (req, res, next) => {
  try {
    console.log("---------------------->1keyur<-------------", req.files);
    // console.log('----------------------req.body',req.files.profile_image)

    const data1 = await clientPersonalModel.findOne({
      where: { id: req.params.id },
    });
    if (req.body.email_id == data1.email_id) {
      console.log(data1);
      console.log(data1.id);
      // next()
    } else {
      const checkEmail_id = await loginModel.findOne({
        where: { email: req.body.email_id },
      });
      if (!checkEmail_id) {
        if (data1.adminStatus == "Approved") {
          const updateEmail = await loginModel.update(
            { email: req.body.email_id },
            { where: { login_random: data1.client_random } }
          );
          console.log("all is ok");
        } else {
          console.log("This Email Not Approved");
        }
        // next()
      } else {
        req.flash("error", "Email Already In Database");
        return res.redirect("/admin/candidateList");
      }
    }
    console.log(req.body);
    console.log("---------->", req.file);
    // console.log(req.params.id)
    console.log(data1.id);

    console.log("3", req.files);
    console.log("hiii");
    if (req.files) {
      console.log(req.body);
      const {
        candidate_name,
        advert_ref,
        mobile_number,
        email_id,
        passport,
        candidate_dob,
        driver_car_owner,
        dbs,
        current_salary,
        desired_salary,
        notice_period,
        current_pay_status,
        reason_for_leave,
        current_position,
      } = req.body;
      if (req.files.profile_image && req.files.upload_cv) {
        console.log("This is req.files1------------>", req.file);
        console.log("This is req.files2------------>", req.files);
        const profileImage = req.files["profile_image"][0];
        const uploadCV = req.files["upload_cv"][0];

        const updateClient1 = {
          candidate_name: candidate_name,
          advert_ref: advert_ref,
          mobile_number: mobile_number,
          email_id: email_id,
          passport: passport,
          candidate_dob: candidate_dob,
          driver_car_owner: driver_car_owner,
          dbs: dbs,
          profile_image: profileImage.filename,
          upload_cv: uploadCV.filename,
          current_salary: current_salary,
          desired_salary: desired_salary,
          notice_period: notice_period,
          current_pay_status: current_pay_status,
          reason_for_leave: reason_for_leave,
          current_position: current_position,
        };
        console.log("candidate dashboard fil2e-------------->", updateClient1);

        const updateClient = await clientPersonalModel.update(updateClient1, {
          where: { id: data1.id },
        });
        console.log("candidate dashboard file-------------->", updateClient);
        req.flash("success", "Data Updated Successfully");
        return res.redirect("/admin/candidateList");
      } else if (req.files.upload_cv) {
        const uploadCV = req.files["upload_cv"][0];

        const updateClient1 = {
          candidate_name: candidate_name,
          advert_ref: advert_ref,
          mobile_number: mobile_number,
          email_id: email_id,
          passport: passport,
          candidate_dob: candidate_dob,
          driver_car_owner: driver_car_owner,
          dbs: dbs,
          // profile_image:profileImage.filename,
          upload_cv: uploadCV.filename,
          current_salary: current_salary,
          desired_salary: desired_salary,
          notice_period: notice_period,
          current_pay_status: current_pay_status,
          reason_for_leave: reason_for_leave,
          current_position: current_position,
        };
        console.log("candidate dashboard fil2e-------------->", updateClient1);

        const updateClient = await clientPersonalModel.update(updateClient1, {
          where: { id: data1.id },
        });
        console.log("candidate dashboard file-------------->", updateClient);
        req.flash("success", "Data Updated Succesfully");

        return res.redirect("/admin/candidateList");
      } else if (req.files.profile_image) {
        const profileImage = req.files["profile_image"][0];

        const updateClient1 = {
          candidate_name: candidate_name,
          advert_ref: advert_ref,
          mobile_number: mobile_number,
          email_id: email_id,
          passport: passport,
          candidate_dob: candidate_dob,
          driver_car_owner: driver_car_owner,
          dbs: dbs,
          profile_image: profileImage.filename,
          // upload_cv:uploadCV.filename,
          current_salary: current_salary,
          desired_salary: desired_salary,
          notice_period: notice_period,
          current_pay_status: current_pay_status,
          reason_for_leave: reason_for_leave,
          current_position: current_position,
        };
        console.log("candidate dashboard fil2e-------------->", updateClient1);

        const updateClient = await clientPersonalModel.update(updateClient1, {
          where: { id: data1.id },
        });
        console.log("candidate dashboard file-------------->", updateClient);
        req.flash("success", "Data Updated Succesfully");
        return res.redirect("/admin/candidateList");
      } else {
        console.log("111");
        const candidateBody = req.body;

        // const addClient=await clientPersonalModel.create({
        //     candidate_name:candidateBody.candidate_name,
        //     advert_ref:candidateBody.advert_ref,
        //     mobile_number:candidateBody.mobile_number,
        //     email_id:candidateBody.email_id,
        //     passport:candidateBody.passport,
        //     candidate_dob:candidateBody.candidate_dob,
        //     driver_car_owner:candidateBody.driver_car_owner,
        //     dbs:candidateBody.dbs,
        //     profile_image:profileImage.filename,
        //     upload_cv:uploadCV.filename,
        //     current_salary:candidateBody.current_salary,
        //     desired_salary:candidateBody.desired_salary,
        //     notice_period:candidateBody.notice_period,
        //     current_pay_status:candidateBody.current_pay_status,
        //     reason_for_leave:candidateBody.reason_for_leave,
        //     current_position:candidateBody.current_position,
        //   })
        const upDAta = await clientPersonalModel.update(candidateBody, {
          where: { id: data1.id },
        });
        console.log("candidate dashboard file1-------------->", upDAta);
        req.flash("success", "Candidate Data Updated successfully ");
        return res.redirect("/admin/candidateList");
      }
    } else {
      console.log("111");
      const candidateBody = req.body;

      // const addClient=await clientPersonalModel.create({
      //     candidate_name:candidateBody.candidate_name,
      //     advert_ref:candidateBody.advert_ref,
      //     mobile_number:candidateBody.mobile_number,
      //     email_id:candidateBody.email_id,
      //     passport:candidateBody.passport,
      //     candidate_dob:candidateBody.candidate_dob,
      //     driver_car_owner:candidateBody.driver_car_owner,
      //     dbs:candidateBody.dbs,
      //     profile_image:profileImage.filename,
      //     upload_cv:uploadCV.filename,
      //     current_salary:candidateBody.current_salary,
      //     desired_salary:candidateBody.desired_salary,
      //     notice_period:candidateBody.notice_period,
      //     current_pay_status:candidateBody.current_pay_status,
      //     reason_for_leave:candidateBody.reason_for_leave,
      //     current_position:candidateBody.current_position,
      //   })
      const upDAta = await clientPersonalModel.update(candidateBody, {
        where: { id: data1.id },
      });
      console.log("candidate dashboard file1-------------->", upDAta);
      req.flash("success", "Candidate Data Updated successfully ");
      return res.redirect("/admin/candidateList");
    }
  } catch (error) {
    console.log("e", error);
    console.error(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.updateCandidate2 = async (req, res) => {
  try {
    const cand2 = req.body;
    const data = await clientPersonalModel.update(cand2, {
      where: { id: req.params.id },
    });
    req.flash("success", "Candidate Updated Successfully");
    return res.redirect("/admin/candidateList");
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.updateCandidate3 = async (req, res) => {
  try {
    const cand3 = req.body;
    const data = await clientPersonalModel.update(cand3, {
      where: { id: req.params.id },
    });
    req.flash("success", "Candidate Updated Successfully");
    return res.redirect("/admin/candidateList");
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};

exports.updateCandidate4 = async (req, res) => {
  try {
    const cand4 = req.body;
    const editedSkills = req.body.candidate_skills;
    const updatedSkillsData = {
      skill_id: editedSkills,
    };
    // const allskill={
    //   skill_id:cand4.candidate_skills
    // }
    const allIndustry = {
      industry_id: req.body.candidate_industry,
    };
    const allJob = {
      job_id: req.body.job_titles,
    };
    const updatedSkillsJSON = JSON.stringify(updatedSkillsData);
    console.log(
      "update form333------->",
      allIndustry,
      updatedSkillsData,
      allJob,
      updatedSkillsJSON
    );
    const can4 = {
      driver: cand4.driver,
      avail_for_emg_shift: cand4.avail_for_emg_shift,
      jobs: allJob,
      allIndustry: allIndustry,
      skills: updatedSkillsData,
    };
    console.log(can4);
    const data = await clientPersonalModel.update(can4, {
      where: { id: req.params.id },
    });
    req.flash("success", "Candidate Data Updated");
    return res.redirect("/admin/candidateList");
  } catch (error) {
    console.log(error);
    req.flash("error", "Something Went Wrong");
    return res.redirect("/login");
  }
};
