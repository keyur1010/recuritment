const { Sequelize, DataTypes } = require("sequelize");

const db = require("../../../config/database");
const { doesNotMatch } = require("assert");

const clientModel = db.clientModel;
const clientMultiModel=db.clientMultiModel
const departmentModel=db.departmentModel
const companyModel=db.companyModel
const fin_yearsModel=db.fin_yearsModel
const g_jobModel=db.g_jobModel
const g_industryModel=db.g_industryModel
const skillModel=db.skillModel
const advert_refModel=db.advert_refModel




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
    const data=await companyModel.findOne({where:{email:companyData.email}})
    if(!data){
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
        company_logo:companyData.company_logo,
        password:companyData.password,
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
    const data=await companyModel.findAll() 
    console.log("companyList---------->",data)
    return res.render('./admin/companyList.ejs',{data:data})
  } catch (error) {
    console.log(error)
  }
}

exports.editCompany=async(req,res)=>{
  try {
    const findCompany=await companyModel.findOne({where:{id:req.params.id}})
    return res.render('./admin/companyEdit.ejs',{findCompany:findCompany})
  } catch (error) {
    console.log(error)
  }
}


exports.editCompany1=async(req,res)=>{
  try {
    const newData=req.body
    const data=await companyModel.findOne({where:{id:req.params.id}})
    if (data) {
      const updateData = await companyModel.update(newData, { where: { id: req.params.id } })
      return res.redirect('/admin/companyList')
  }else{
      console.log('data not submited')
      return res.redirect('/admin/companyList')
  }
  } catch (error) {
    console.log(error)
  }
}



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





