const { Sequelize, DataTypes } = require("sequelize");

const db = require("../../../config/database");
const { doesNotMatch } = require("assert");

const clientModel = db.clientModel;
const clientMultiModel=db.clientMultiModel
const departmentModel=db.departmentModel
// const loginModel = db.loginModel;

exports.adminDashboard = async (req, res) => {
  try {
    console.log("login page");
    return res.render("./admin/dashboard.ejs");
  } catch (error) {
    console.log(error);
  }
};

exports.newClient = async (req, res) => {
  try {
    console.log("new client");
    return res.render("./admin/clientCreate.ejs");
  } catch (error) {
    console.log(error);
  }
};
exports.newClientCreate = async (req, res) => {
    console.log("this is req.body ---------->",req.body)

  try {
    const {
      client_name,type,registered_address,contract_name,contract_position,contract_number,contract_mobile,contract_email,website,industry,vat_number,registration_no,client_logo,img_url,subscrption_level_agreed,payroll_subsribe,employement_contract,service,finance_name,finance_position,finance_number,finance_mobile,finance_email,finance_credit_limit,finance_debit_details,billing_name,billing_position,billing_number,billing_mobile,billing_email,
    } = req.body;

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
      client_logo: client_logo,
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
    });
    // console.log("this is req.body ---------->",req.body)
    // console.log("data---------->", data);
    const candidateEducationData = req.body;

        
    // const emailCheck=await candidateEducationModel.findOne({where:{email:req.body.email,hr_id:req.session.user.hr_id}})
    // if(!emailCheck){
    for (let i = 0; i < candidateEducationData.service_name.length; i++) {
        const CandidateEdu = await clientMultiModel.create({
          service_name: candidateEducationData.service_name[i],
          service_position: candidateEducationData.service_position[i],
          service_number: candidateEducationData.service_number[i],
          service_mobile:candidateEducationData.service_mobile[i],
          service_email:candidateEducationData.service_email[i],
          service_address:candidateEducationData.service_address[i],
        });
        console.log('--------candidate----->',CandidateEdu)
    }
    return res.send(data);
  } catch (error) {
    console.log(error);
  }
};



exports.adminDepartment=async(req,res)=>{
  try {
    const data=await departmentModel.findAll({where:{status:1}})
    // console.log("department_data------------>",data)
    return res.render('./admin/adminDepartment.ejs',{data:data})
  } catch (error) {
    console.log(error)
  }
}
exports.Save_m_departments=async(req,res)=>{
  try {
    const {dep_code,department_name}=req.body
    const department_Check = await departmentModel.findOne({
      where: {
        [Sequelize.Op.or]: [
          { dep_code: dep_code },
          { department_name: department_name },
        ],
      },
    });
    console.log('department_Check--------------->',department_Check)
    if(!department_Check){
      const data=await departmentModel.create({
        dep_code:dep_code,
        department_name:department_name
      })
      // console.log("department_data---------->",data)
      return res.redirect('/admin/adminDepartment')

    }else{
      console.log('this department already in the database ')
      // alert('already in database')
      return res.redirect('/admin/adminDepartment')
    }
  } catch (error) {
    console.log(error)
  }
}