const { Sequelize, DataTypes, DATE,Op, where } = require("sequelize");
const nodemailer=require('nodemailer')
const db = require("../../../config/database");
// const { doesNotMatch } = require("assert");
const path=require('path')
const fs = require('fs');
require('../../../routes/adminRoutes')
const loginModel=db.loginModel
const clientModel = db.clientModel;
const clientMultiModel=db.clientMultiModel
const departmentModel=db.departmentModel
const companyModel=db.companyModel
const fin_yearsModel=db.fin_yearsModel
const g_jobModel=db.g_jobModel
const g_industryModel=db.g_industryModel
const skillModel=db.skillModel
const advert_refModel=db.advert_refModel
const EmployeeModel=db.EmployeeModel
const clientPersonalModel=db.clientPersonalModel



const transporter = nodemailer.createTransport({
  service: 'gmail',
  port:587,
  auth: {
    user: 'mubdadakeyur@gmail.com',
    pass: 'wevz nuig tjgk txzd',
  },
});


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
      client_name,type,registered_address,contract_name,contract_position,contract_number,contract_mobile,contract_email,website,industry,vat_number,registration_no,client_logo,img_url,subscrption_level_agreed,payroll_subsribe,employement_contract,service,services,finance_name,finance_position,finance_number,finance_mobile,finance_email,finance_credit_limit,finance_debit_details,billing_name,billing_position,billing_number,billing_mobile,billing_email,
    } = req.body;
    const { originalname, filename } = req.file;
    function generateRandomString(length) {
      const letters = 'abcdefghijklmnopqrstuvwxyz';
      let randomString = '';
    
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        randomString += letters.charAt(randomIndex);
      }
    
      return randomString;
    }
    
    const now = new Date();
    const dateString = now.toISOString().replace(/[^0-9]/g, '');
    const randomStringLength = dateString.length;
    
    const randomString = generateRandomString(randomStringLength) + dateString;
    
    // Save the file details to your Sequelize model
 
    // console.log('fileupload-------------------?>',fileRecord)

      const allServices = {
        service_name: req.body.service_name,
        service_position: req.body.service_position,
        service_number: req.body.service_number,
        service_mobile: req.body.service_mobile,
        service_email: req.body.service_email,
        service_address: req.body.service_address, // Corrected property name
      };
      
      const serviceDataJSON = JSON.stringify(allServices);
      // const clientLogo = req.file;

      // console.log("this ---------->",serviceDataJSON);

      const insertOn=new Date()
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
      client_logo:  filename,
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
      services:allServices,
      insertOn:insertOn,
      login_random:randomString
      // insertBy:req.session.user.id,
    
    });
    const clietLogin=await loginModel.create({
      email:contract_email,
      password:"123456",
      role:"Client",
      login_random:randomString
    })
    // console.log("data---------->", data);
    
    
    return res.redirect('/admin/clientList');
  } catch (error) {
    console.log(error);
  }
};


exports.clientList=async(req,res)=>{
  try {
    const clientData=await clientModel.findAll({where:{isDeleted:0}})
   return res.render('./general/clientList.ejs',{clientData:clientData})
  } catch (error) {
    console.log(error)
  }
}




exports.clientEdit=async(req,res)=>{
  try {
    const data=await clientModel.findOne({where:{id:req.params.id}})
    console.log('data-------------------------->',data)
    const json_data=JSON.parse(data.dataValues.services)
    // console.log(service_data)
    // const json_data=JSON.parse(service_data)
    console.log(json_data)
      
      console.log('data',json_data)
      return res.render('./general/clientEdit.ejs',{data:data,json_data:json_data})
  } catch (error) {
    console.log(error)
  }
}
exports.clientDelete=async(req,res)=>{
  try {
    const data=await clientModel.update({isDeleted:1},{where:{id:req.params.id}})
    return res.redirect('/admin/clientList')
  } catch (error) {
    console.log(error)
  }
}




    



exports.approveBtn=async(req,res)=>{
  try {
    const data=await clientModel.findOne({where:{id:req.params.id}})
    if(data.admin_status=="Pending"){
      const updatebtn=await clientModel.update({admin_status:"Approved"},{where:{
        id:req.params.id
      }})  
      return res.redirect('/admin/clientList')

    }  
    else if(data.admin_status=="Approved"){
      const updatebtn=await clientModel.update({admin_status:"Pending"},{where:{
        id:req.params.id
      }})  
      return res.redirect('/admin/clientList')

   
    }  
    else{
      console.log('error on update')
      return res.redirect('/admin/clientList')
    }  
  } catch (error) {
    console.log(error)
  }  
}  

exports.clientEdit1=async(req,res)=>{
  try {
    const {client_name,type,registered_address,contract_name,contract_position,contract_number,contract_mobile,contract_email,website,industry,vat_number,registration_no,client_logo,img_url,subscrption_level_agreed,payroll_subsribe,employement_contract,service,services,finance_name,finance_position,finance_number,finance_mobile,finance_email,finance_credit_limit,finance_debit_details,billing_name,billing_position,billing_number,billing_mobile,billing_email,} = req.body;
    if(req.file){
      const {filename,originalname}=req.file
      const allServices = {
        service_name: req.body.service_name,
        service_position: req.body.service_position,
        service_number: req.body.service_number,
        service_mobile: req.body.service_mobile,
        service_email: req.body.service_email,
        service_address: req.body.service_address, // Corrected property name
      };
      
      const serviceDataJSON = JSON.stringify(allServices);
      const newBody={
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
      client_logo:  filename,
      img_url: img_url,
      subscrption_level_agreed: subscrption_level_agreed,
      payroll_subsribe: payroll_subsribe,
      employement_contract: employement_contract,
      service: service,
      
      }
    const data=await clientModel.findOne({where:{id:req.params.id}})
    console.log('client edit 1------------->',data)
    const updateForm1=await clientModel.update(newBody,{ where: { id: req.params.id } })
    return res.redirect(`/admin/clientEdit/${req.params.id}`)
    }
    else{

      const newBody=req.body
      const data=await clientModel.findOne({where:{id:req.params.id}})
      console.log('client edit 1------------->',data)
      const updateForm1=await clientModel.update(newBody,{ where: { id: req.params.id } })
      return res.redirect(`/admin/clientEdit/${req.params.id}`)
    }
  } catch (error) {
    console.log(error)
  }
}
exports.clientEdit2=async(req,res)=>{
  try {
    const newData=req.body
    const data=await clientModel.findOne({where:{id:req.params.id}})
    console.log('data2------------------>',data)
    const updateForm2=await clientModel.update(newData,{where:{id:req.params.id}})
    return res.redirect(`/admin/clientEdit/${req.params.id}`)
  } catch (error) {
    console.log(error)
  }
}


exports.clientEdit3=async(req,res)=>{
  try {
    const newData=req.body
    const data=await clientModel.findOne({where:{id:req.params.id}})
    console.log('data3------------------>',data)
    const updateForm2=await clientModel.update(newData,{where:{id:req.params.id}})
    return res.redirect(`/admin/clientEdit/${req.params.id}`)
  } catch (error) {
    console.log(error)
  }
}





// department controller start


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

exports.editDepartment=async(req,res)=>{
  try {
    const editData=await departmentModel.findOne({where:{id:req.params.id}})
    const data=await departmentModel.findAll({where:{status:1}})
    console.log("edit data-------------->",editData)
    return res.render('./admin/editDepartment.ejs',{editData:editData,data:data})
  } catch (error) {
    console.log(error)
  }  
}  

exports.editDepartment1=async(req,res)=>{
  try {
    const newData=req.body
    const data=await departmentModel.findOne({where:{id:req.params.id}})
    if (data) {
      const updateData = await departmentModel.update(newData, { where: { id: req.params.id } })
      return res.redirect('/admin/adminDepartment')
  }else{  
      console.log('data not submited')
      return res.redirect('/admin/adminDepartment')
  }    
  } catch (error) {
    console.log(error)
  }  
}  


exports.deleteDepartment=async(req,res)=>{
  try {
    const data=await departmentModel.destroy({where:{id:req.params.id}})
    return res.redirect('/admin/adminDepartment')
  } catch (error) {
    console.log(error)
  }  
}  

// department controller start




exports.addCompany=async(req,res)=>{
  try {
    return res.render('./admin/companyProfile.ejs')
  } catch (error) {
    console.log(error)
  }  
}  

exports.saveAddCompany=async(req,res)=>{
  try {
    const companyData=req.body
    const {originalname,filename}=req.file
    const data=await companyModel.findOne({where:{email:companyData.email}})
    if(!data){
      function generateRandomString(length) {
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        let randomString = '';
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * letters.length);
          randomString += letters.charAt(randomIndex);
        }
      
        return randomString;
      }
      
      const now = new Date();
      const dateString = now.toISOString().replace(/[^0-9]/g, '');
      const randomStringLength = dateString.length;
      
      const randomString = generateRandomString(randomStringLength) + dateString;
      const newCompany=await companyModel.create({
        company_name:companyData.company_name,
        shrtname:companyData.shrtname,
        proprietor:companyData.proprietor,
        phone:companyData.phone,
        phone2:companyData.phone2,
        email:companyData.email,
        email2:companyData.email2,
        state:companyData.state,
        state_code:companyData.state_code,
        address:companyData.address,
        gst_applicable:companyData.gst_applicable,
        address:companyData.address,
        gst_no:companyData.gst_no,
        pan_no:companyData.pan_no,
        website:companyData.website,
        company_logo:filename,
        password:companyData.password,
        login_random:randomString
      })  
      const loginCompany=await loginModel.create({
        email:companyData.email,
        password:companyData.password,
        role:"Company",
        login_random:randomString

      })
      console.log('new company Data--------->',newCompany)
      return res.redirect('/admin/admindashboard')
    }else{
      console.log('data not saved')
      return res.redirect('/admin/addCompany')
    }  
  } catch (error) {
    console.log(error)
  }  
}  

exports.companyList=async(req,res)=>{
  try {
    const data=await companyModel.findAll({}) 
    console.log("companyList---------->",data)
    return res.render('./admin/companyList.ejs',{data:data})
  } catch (error) {
    console.log(error)
  }  
}  

exports.editCompany=async(req,res)=>{
  try {
    const findCompany=await companyModel.findOne({where:{id:req.params.id}})
    return res.render('./admin/editCompany.ejs',{findCompany:findCompany})
  } catch (error) {
    console.log(error)
  }  
}  

exports.editCompany1=async(req,res)=>{
  try {
    const{company_name,shrtname,proprietor,phone,phone2,email,email2,pin_code,place,state,state_code,company_address,gst_applicable,address,gst_no,pan_no,website,password,wp_api_key,distance_api_key,smtp_host,smtp_port,smtp_sender_id,smtp_password,smtp_secure,smtp_name,default_cc_mailid}=req.body
      if(req.file){
        const{filename,originalname}=req.file
        const newData={
        company_name:company_name,
        shrtname:shrtname,
        proprietor:proprietor,
        phone:phone,
        phone2:phone2,
        email:email,
        email2:email2,
        state:state,
        state_code:state_code,
        address:address,
        company_logo:filename,
        gst_applicable:gst_applicable,
        address:address,
        gst_no:gst_no,
        pan_no:pan_no,
        website:website,
        password:password,
        wp_api_key:wp_api_key,
        distance_api_key:distance_api_key,
        smtp_host:smtp_host,
        smtp_port:smtp_port,
        smtp_sender_id:smtp_sender_id,
        smtp_password:smtp_password,
        smtp_secure:smtp_secure,
        smtp_name:smtp_name,
        default_cc_mailid:default_cc_mailid,
        }
        const data=await companyModel.findOne({where:{id:req.params.id}})
        console.log('company post api----------->',data)
        console.log('company post api1----------->',req.body)
        if (data) {
          console.log('this is company post api');
          const updateData = await companyModel.update(newData, { where: { id: req.params.id } })
          return res.redirect('/admin/companyList')
        }else{  
          console.log('data not submited')
          return res.redirect('/admin/companyList')
        }    
      }else{
        const newData=req.body
        const data=await companyModel.findOne({where:{id:req.params.id}})
        console.log('company post api----------->',data)
        console.log('company post api1----------->',req.body)
        if (data) {
          console.log('this is company post api');
          const updateData = await companyModel.update(newData, { where: { id: req.params.id } })
          return res.redirect('/admin/companyList')
      }else{  
          console.log('data not submited')
          return res.redirect('/admin/companyList')
      }    


      }




  } catch (error) {
    console.log(error)
  }  
}  


// fin_years controller start


exports.fin_years=async(req,res)=>{
  try {
    const year_Data=await fin_yearsModel.findAll({where:{status:1}})
    return res.render('./admin/fin_years.ejs',{year_Data:year_Data})
  } catch (error) {
    console.log(error)
  }  
}  

exports.Save_fin_year=async(req,res)=>{
  try {
    const yearBody=req.body
    const checkValue=await fin_yearsModel.findOne({where:{year_name:yearBody.year_name}})
    console.log("checkvalue------------------->",checkValue)
    if(!checkValue||undefined||null){
      const addFinData=await fin_yearsModel.create({
        year_name:yearBody.year_name,
        year_start_date:yearBody.year_start_date,
        year_end_date:yearBody.year_end_date,

      })  
      console.log('finYear added;')
      return res.redirect('/admin/fin_years')
    }else{
      console.log('data not added')
      return res.send('data not added')
    }  
  } catch (error) {
  console.log(error)      
  }
}  

exports.edit_fin_year=async(req,res)=>{
  try {
    const data=await fin_yearsModel.findAll({where:{status:1}})
    const fin_year_data=await fin_yearsModel.findOne({where:{id:req.params.id}})
    console.log('fin_year------------------>0',fin_year_data)

    return res.render('./admin/edit_fin_year.ejs',{data:data,fin_year_data:fin_year_data})
  } catch (error) {
    console.log(error)
  }  
}  


exports.edit_fin_year1=async(req,res)=>{
  try {
    const newData=req.body
    const data=await fin_yearsModel.findOne({where:{id:req.params.id}})
    if (data) {
      const updateData = await fin_yearsModel.update(newData, { where: { id: req.params.id } })
      return res.redirect('/admin/fin_years')
  }else{  
      console.log('data not submited')
      return res.redirect('/admin/fin_years')
  }    
  } catch (error) {
    console.log(error)
  }  
}  
exports.Delete_fin_year=async(req,res)=>{
  try {
    const data=await fin_yearsModel.destroy({where:{id:req.params.id}})
    return res.redirect('/admin/fin_years')
  } catch (error) {
    console.log(error)
  }  
}  
// fin_years controller end




// job controller start


exports.g_jobpage=async(req,res)=>{
  try {
    const data=await g_jobModel.findAll({where:{status:1}})
    return res.render('./general/jobTitle.ejs',{data:data})
  } catch (error) {
    console.log(error)
  }  
}  

exports.g_jobAdd=async(req,res)=>{
  try {
    const data=await g_jobModel.findOne({where:{job_title_name:req.body.job_title_name}})
    if(!data){
      const addJob=await g_jobModel.create({
        job_title_name:req.body.job_title_name
      })  
      return res.redirect('/admin/g_jobpage')
    }else{
      console.log('job not added')
      return res.send("data already in database or some other problem")
    }  
  } catch (error) {
    console.log(error)
  }  
}  

exports.jobTItleEdit=async(req,res)=>{
  try {
    const data=await g_jobModel.findAll({where:{status:1}})
    const editJob=await g_jobModel.findOne({where:{id:req.params.id}})
    return res.render('./general/jobTItleEdit.ejs',{data:data,editJob:editJob})
  } catch (error) {
    console.log(error)
  }  
}  

exports.g_jobEdit=async(req,res)=>{
  try {
    const newData=req.body
    const data=await g_jobModel.findOne({where:{id:req.params.id}})
    if (data) {
      const updateData = await g_jobModel.update(newData, { where: { id: req.params.id } })
      return res.redirect('/admin/g_jobpage')
  }else{  
      console.log('data not submited')
      return res.redirect('/admin/g_jobpage')
  }    
  } catch (error) {
    console.log(error)
  }  
}  
exports.Delete_jobtitles=async(req,res)=>{
  try {
    const data=await g_jobModel.destroy({where:{id:req.params.id}})
    return res.redirect('/admin/g_jobpage')
  } catch (error) {
    console.log(error)
  }  
}  

// job controller end



// advert_ref controller start



exports.m_industry=async(req,res)=>{
  try {
    const data=await g_industryModel.findAll({where:{status:1}})
    return res.render('./general/industry.ejs',{data:data})
  } catch (error) {
    console.log(error)    
  }  
}  

exports.Save_m_industry=async(req,res)=>{
  try {
    const data=await g_industryModel.findOne({where:{industry_name:req.body.industry_name}})
    if(!data){
      const addIndustry=await g_industryModel.create({
        industry_name:req.body.industry_name
      })  
      return res.redirect('/admin/m_industry')
    }else{
      console.log('industry not added')
      return res.send("data already in database or some other problem")
    }  
  } catch (error) {
    console.log(error)
  }  
}  

exports.edit_m_industry=async(req,res)=>{
  try {
    const data=await g_industryModel.findAll({where:{status:1}})
    const editInd=await g_industryModel.findOne({where:{id:req.params.id}})
    return res.render('./general/industryEdit.ejs',{data:data,editInd:editInd})
  } catch (error) {
    console.log(error)
  }  
}  

exports.g_industryEdit=async(req,res)=>{
  try {
    const newData=req.body
    const data=await g_industryModel.findOne({where:{id:req.params.id}})
    if (data) {
      const updateData = await g_industryModel.update(newData, { where: { id: req.params.id } })
      return res.redirect('/admin/m_industry')
  }else{  
      console.log('data not submited')
      return res.redirect('/admin/m_industry')
  }    
  } catch (error) {
    console.log(error)
  }  
}  

exports.Delete_m_industry=async(req,res)=>{
  try {
    const data=await g_industryModel.destroy({where:{id:req.params.id}})
    return res.redirect('/admin/m_industry')
  } catch (error) {
    console.log(error)
  }  
}  

// advert_ref controller end




// Skill controller start

exports.m_skillPage=async(req,res)=>{
  try {
    const data=await skillModel.findAll({where:{status:1}})
    return res.render('./general/skillsPage.ejs',{data:data})
  } catch (error) {
    console.log(error)    
  }  
}  

exports.Save_m_skills=async(req,res)=>{
  try {
    console.log('skilll post --------->',req.body)
    const data=await skillModel.findOne({where:{skill_name:req.body.skill_name}})
    if(!data){
      const addSkill=await skillModel.create({
        skill_name:req.body.skill_name
      })  
      return res.redirect('/admin/m_skillPage')
    }else{
      console.log('industry not added')
      return res.send("data already in database or some other problem")
    }  
  } catch (error) {
    console.log(error)
  }  
}  

exports.edit_m_skills=async(req,res)=>{
  try {
    const data=await skillModel.findAll({where:{status:1}})
    const skill=await skillModel.findOne({where:{id:req.params.id}})
    return res.render('./general/skillPageEdit.ejs',{data:data,skill:skill})
  } catch (error) {
    console.log(error)
  }  
}  

exports.edit_m_skills1=async(req,res)=>{
  try {
    const newData=req.body
    const data=await skillModel.findOne({where:{id:req.params.id}})
    if (data) {
      const updateData = await skillModel.update(newData, { where: { id: req.params.id } })
      return res.redirect('/admin/m_skillPage')
  }else{  
      console.log('data not submited')
      return res.redirect('/admin/m_skillPage')
  }    
  } catch (error) {
    console.log(error)
  }  
}  

exports.Delete_m_skills=async(req,res)=>{
  try {
    const data=await skillModel.destroy({where:{id:req.params.id}})
    return res.redirect('/admin/m_skillPage')
  } catch (error) {
    console.log(error)
  }  
}  

// Skill controller end




// advert_ref controller start


exports.ad_ref_page=async(req,res)=>{
  try {
    const data=await advert_refModel.findAll({where:{status:1}})
    return res.render('./general/advert_ref.ejs',{data:data})
  } catch (error) {
    console.log(error)    
  }  
}  

exports.Save_m_advert_ref=async(req,res)=>{
  try {
    console.log('skilll post --------->',req.body)
    const data=await advert_refModel.findOne({where:{ad_ref_name:req.body.ad_ref_name}})
    if(!data){
      const addAdvRef=await advert_refModel.create({
        ad_ref_name:req.body.ad_ref_name
      })  
      return res.redirect('/admin/ad_ref_page')
    }else{
      console.log('industry not added')
      return res.send("data already in database or some other problem")
    }  
  } catch (error) {
    console.log(error)
  }  
}  

exports.edit_m_advertPage=async(req,res)=>{
  try {
    const data=await advert_refModel.findAll({where:{status:1}})
    const adv=await advert_refModel.findOne({where:{id:req.params.id}})
    return res.render('./general/advPageEdit.ejs',{data:data,adv:adv})
  } catch (error) {
    console.log(error)
  }  
}  

exports.edit_m_advert_ref=async(req,res)=>{
  try {
    const newData=req.body
    const data=await advert_refModel.findOne({where:{id:req.params.id}})
    if (data) {
      const updateData = await advert_refModel.update(newData, { where: { id: req.params.id } })
      return res.redirect('/admin/ad_ref_page')
  }else{  
      console.log('data not submited')
      return res.redirect('/admin/ad_ref_page')
  }    
  } catch (error) {
    console.log(error)
  }  
}  

exports.Delete_m_advert_ref=async(req,res)=>{
  try {
    const data=await advert_refModel.destroy({where:{id:req.params.id}})
    return res.redirect('/admin/ad_ref_page')
  } catch (error) {
    console.log(error)
  }  
}  


// advert_ref controller end














// Employee controller start



exports.adminEmployee=async(req,res)=>{
  try {
    const EmpData=await EmployeeModel.findAll({})
    return res.render('./admin/adminEmployee.ejs',{EmpData:EmpData})
  } catch (error) {
    console.log(error)
  }  
}  

exports.adminAddEmployee=async(req,res)=>{
  try {
    const EmpData=await EmployeeModel.findAll({where:{status:1}})
    const department=await departmentModel.findAll({where:{status:1}})
    const employees = await EmployeeModel.findAll({
      where: {status: 1 ,is_report_auth: 'Y'}
    });
    return res.render('./admin/adminAddEmployee.ejs',{EmpData:EmpData,department:department,employees:employees})
  } catch (error) {
    console.log(error)
  }  
}  

exports.AdminAddEmployee1=async(req,res)=>{
  try {
    const employeeBody=req.body
    const { originalname, filename } = req.file;
    const checkEmployee=await EmployeeModel.findOne({where:{email:employeeBody.email}})
    if(!checkEmployee){
      function generateRandomString(length) {
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        let randomString = '';
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * letters.length);
          randomString += letters.charAt(randomIndex);
        }
      
        return randomString;
      }
      
      const now = new Date();
      const dateString = now.toISOString().replace(/[^0-9]/g, '');
      const randomStringLength = dateString.length;
      
      const randomString = generateRandomString(randomStringLength) + dateString;
      
      const data=await EmployeeModel.create({
        fname:employeeBody.fname,
        lname:employeeBody.lname,
        em_username:employeeBody.em_username,
        contact:employeeBody.contact,
        em_address:employeeBody.em_address,
        email:employeeBody.email,
        dep_id:employeeBody.dep_id,
        is_report_auth:employeeBody.is_report_auth,
        manager_id:employeeBody.manager_id,
        role:employeeBody.role,
        password:employeeBody.password,
        image_url:filename,
        login_random:randomString
      })  
      const Login_data=await loginModel.create({
        email:employeeBody.email,
        password:employeeBody.password,
        role:'Admin',
        login_random:randomString

      })
      console.log('employeeData--------->',data)
      return res.redirect('/admin/adminAddEmployee')
    }else{
      console.log('data already added')
      return res.redirect('/admin/adminAddEmployee')
    }  
  } catch (error) {
    console.log(error)
  }  
}  

exports.employeeView=async(req,res)=>{
  try {
    console.log('data')
    const data = await EmployeeModel.findOne({ where: { id: req.params.id } });
      console.log("--------------employeeviewdata----------->",data)

      return res.render('./general/employeeView.ejs', { d: data });
  } catch (error) {
    console.log(error)
  }  
}  
exports.employeeViewEdit=async(req,res)=>{
  try {
    const {status,em_username,fname,lname,is_report_auth,contact,em_address,email,role,image_url,}=req.body
    if(req.file){

      const{filename}=req.file
      const newData={
        status:status,
        em_username:em_username,
        fname:fname,
        lname:lname,is_report_auth:is_report_auth,
        contact:contact,
        em_address:em_address,
        email:email,role:role,
        image_url:filename
      }
      const data=await EmployeeModel.findOne({where:{id:req.params.id}})
      if (data) {
        const updateData = await EmployeeModel.update(newData, { where: { id: req.params.id } })
        return res.redirect('/admin/adminEmployee')
        
    }else{  
        console.log('data not submited')
        return res.redirect('/admin/adminEmployee')
    }  
    }else{
      const newData={
        status:status,
        em_username:em_username,
        fname:fname,
        lname:lname,is_report_auth:is_report_auth,
        contact:contact,
        em_address:em_address,
        email:email,role:role,
      }
      const data=await EmployeeModel.findOne({where:{id:req.params.id}})
      if (data) {
        const updateData = await EmployeeModel.update(newData, { where: { id: req.params.id } })
        return res.redirect('/admin/adminEmployee')
        
    }else{  
        console.log('data not submited')
        return res.redirect('/admin/adminEmployee')
    }  
    }
    
  
    
  } catch (error) {
    console.log(error)
  }
}

// Employee controller start





exports.candidateList=async(req,res)=>{
  try {
    const PData=await clientPersonalModel.findAll({where:{adminStatus:"Pending"}})
    const AData=await clientPersonalModel.findAll({where:{adminStatus:"Approved"}})
    const AllData=await clientPersonalModel.findAll({})
    return res.render('./general/candidateList.ejs',{PData:PData,AData:AData,AllData:AllData})
  } catch (error) {
    console.log(error)
  }  
}  
exports.Reject_accept_candidate=async(req,res)=>{
  try {
    const data=await clientPersonalModel.findOne({where:{id:req.params.id}})
    if(data){
      const approveData=await clientPersonalModel.update({adminStatus:"Rejected"},{where:{id:req.params.id}})
    }else{
      console.log('not updated')
      return res.redirect('/admin/candidateList')
    }
    return res.redirect('/admin/candidateList')
  } catch (error) {
    
  }
}
exports.Approve_accept_candidate=async(req,res)=>{
  try {
    const data=await clientPersonalModel.findOne({where:{id:req.params.id}})
    if(data){
      const approveData=await clientPersonalModel.update({adminStatus:"Approved"},{where:{id:req.params.id}})
      const mailOptions = {
        from: 'Support <support@gmail.com>',
        to:data.email_id,
        subject:"you are approved",
        text:`your email is ${data.email_id} and your password is 123456`
      };
      try {
        await transporter.sendMail(mailOptions);
        const passwordAdd=await clientPersonalModel.update({password:'123456'},{where:{id:req.params.id}})
        const loginData=await loginModel.create({
          login_random:data.client_random,
          email:data.email_id,
          role:"Candidate",
          password:'123456'
        })
        return res.redirect('/admin/candidateList'); // Redirect back to the form page
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      }
    }else{
      console.log('not updated')
      return res.redirect('/admin/candidateList')
    }
    return res.redirect('/admin/candidateList')
  } catch (error) {
    
  }
}


























