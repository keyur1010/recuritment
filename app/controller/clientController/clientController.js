const { Sequelize, DataTypes } = require("sequelize");

const db = require("../../../config/database");

const loginModel = db.loginModel;
const clientPersonalModel = db.clientPersonalModel;
const g_industryModel=db.g_industryModel
const skillModel=db.skillModel
const g_jobModel=db.g_jobModel
const m_clientSkillModel=db.m_clientSkillModel
const m_clientJobModel=db.m_clientJobModel
const m_clientModelIndustry=db.m_clientModelIndustry
const advert_refModel=db.advert_refModel
const companyModel=db.companyModel
const clientModel=db.clientModel
const departmentModel=db.departmentModel
const recruitmentModel=db.recruitmentModel
const r_skillModel=db.r_skillModel
const r_industryModel=db.r_industryModel




exports.clientPage = async (req, res) => {
  try {
    console.log("client page");
    // const session=await loginModel.findOne({where:{role:req.session.user.role}})

    const industry=await g_industryModel.findAll({where:{status:1}})
    const advref=await advert_refModel.findAll({where:{status:1}})
    const skills=await skillModel.findAll({where:{status:1}})
    const jobs=await g_jobModel.findAll({where:{status:1}})
    return res.render("./clientSign.ejs",{industry:industry,skills:skills,jobs:jobs,advref:advref,messages:req.flash()});
  } catch (error) {
    console.log(error);
    req.flash('error','Something Went Wrong')
    return res.redirect('/login')
  }
};
exports.clientLogin = async (req, res) => {
  try {
    const candidateBody = req.body;

    const data=await loginModel.findOne({where:{email:candidateBody.email_id}})

    if(!data){
      const profileImage = req.files['profile_image'][0];
      const uploadCV = req.files['upload_cv'][0];
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
      const allSkill = {
        skill_id: req.body.client_skills,
      };
      const allIndustry = {
        industry_id: req.body.clientIndustry,
      };
      const allJob = {
        job_id: req.body.client_jobs,
      };
      // console.log(allSkill)
      // const AllJsonSkill=JSON.stringify(allSkill)
      
        const addClient=await clientPersonalModel.create({
          candidate_name:candidateBody.candidate_name,
          advert_ref:candidateBody.advert_ref,
          countryCode:candidateBody.countryCode,
          mobile_number:candidateBody.mobile_number,
          email_id:candidateBody.email_id,
          address_line_1:candidateBody.address_line_1,
          address_line_2:candidateBody.address_line_2,
          post_code:candidateBody.post_code,
          visa:candidateBody.visa,
          passport:candidateBody.passport,
          other_passport:candidateBody.other_passport,
          driver_car_owner:candidateBody.driver_car_owner,
          candidate_dob:candidateBody.candidate_dob,
          dbs:candidateBody.dbs,
          profile_image:profileImage.filename,//
          upload_cv:uploadCV.filename,   //
          current_salary:candidateBody.current_salary,
          desired_salary:candidateBody.desired_salary,
          notice_period:candidateBody.notice_period,
          current_pay_status:candidateBody.current_pay_status,
          reason_for_leave:candidateBody.reason_for_leave,
          current_position:candidateBody.current_position,
          w_u_consider:candidateBody.w_u_consider,
          skills:allSkill,
          jobs:allJob,
          allIndustry:allIndustry,
          client_random:randomString
        })
        
       
        
          
  
  
  
  
        
        console.log("addClient----------------------->",addClient)
        req.flash('success','Your Request Send To Admin')
        return res.redirect('/client/thanku')
      // }else{
    }else{
req.flash('error','Email Already Exist')
return res.redirect('/login')
    }

  } catch (error) {
    console.log(error)
    req.flash('error','Something Went Wrong')
    return res.redirect('/login')
  }
};






exports.thanku=async(req,res)=>{
  try {
    
    return res.render('./main/thanku.ejs')
  } catch (error) {
    console.log(error)
    req.flash('error','Something Went Wrong')
    return res.redirect('/login')
  }
}









exports.clientView=async(req,res)=>{
  try {
    const session=await loginModel.findOne({where:{role:req.session.user.role}})
    try {
      console.log(req.session.user)

      // const clientData=await loginModel.findOne({where:{login_random:req.session.user.login_random}})
      // console.log(clientData.id)
      const clientData=await clientModel.findOne({where:{login_random:req.session.user.login_random}})
      // console.log('data-------------------------->',data)
      const json_data=JSON.parse(clientData.dataValues.services)
      console.log(json_data)
      // req.flash("success",{messages:"working properly"})
      return res.render('./clientdashboard/clientView.ejs',{session:session,clientdata:clientData,json_data:json_data,messages:req.flash()})
      
    } catch (e) {
      req.flash('error','problem in fetching data')
      return res.render('./clientdashboard/clientView.ejs',{session:session,messages:req.flash()})
    }
  } catch (error) {
    console.log(error)
    req.flash('error','Something Went Wrong')
    return res.redirect('/login')
  }
}
exports.recruitmentView=async(req,res)=>{
  try {
    const session=await loginModel.findOne({where:{role:req.session.user.role}})
    const s=await loginModel.findOne({where:{email:req.session.user.email}})


    const data=await recruitmentModel.findAll({where:{client_name:req.session.user.id}})
    console.log(data)

    return res.render('./clientdashboard/recruitmentView.ejs',{session:session,data:data,s:s,messages:req.flash()})
  } catch (error) {
    console.log(error)
    req.flash('error','Something Went Wrong')
    return res.redirect('/login')
  }
}

exports.addRecruitment=async(req,res)=>{
  try {
    const session=await loginModel.findOne({where:{role:req.session.user.role}})

    const depart=await departmentModel.findAll({where:{status:1}})
    const industry=await g_industryModel.findAll({where:{status:1}})
    // const advref=await advert_refModel.findAll({where:{status:1}})
    const skills=await skillModel.findAll({where:{status:1}})
    // const jobs=await g_jobModel.findAll({where:{status:1}})
    return res.render('./clientdashboard/addRecruitment.ejs',{session:session,depart:depart,industry:industry,skills:skills,messages:req.flash()})
  } catch (error) {
    console.log(error)
    req.flash('error','Something Went Wrong')
    return res.redirect('/login')

  }
}
exports.saveRecruitment=async(req,res)=>{
  try {
    const recruitmentBody = req.body;
  
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
    const skillData1={
      skill_id:req.body.recruit_skills
    }
    const industryData ={
    industry_id:req.body.recruit_industry
    }
    const addRecruitment=await recruitmentModel.create({
      recruit_department:recruitmentBody.recruit_department,
      no_position:recruitmentBody.no_position,
      current_salary:recruitmentBody.current_salary,
      desired_salary:recruitmentBody.desired_salary,
      recruit_skills:skillData1,
      recruit_industry:industryData,
      client_name:req.session.user.id,
      r_random:randomString
    })
    

   
    // for(var i=0;i<recruitmentBody.recruit_skills.length;i++){
    //   const r_skill=await r_skillModel.create({
    //     skill_id:recruitmentBody.recruit_skills[i],
    //     r_random:randomString,

    //   })
    // for(var i=0;i< recruitmentBody.recruit_industry.length;i++){
    //   const r_industry=await r_industryModel.create({
    //     industry_id:recruitmentBody.recruit_industry[i],
    //     r_random:randomString
    //   })
    // }
    // console.log('1--------->',skillsData)
    console.log('1--------->',industryData)
    console.log('data------------->',addRecruitment)
    // }
    req.flash('success','Recruitment Added Successfully')
    return res.redirect('/client/recruitmentView')
  } catch (error) {
    console.log(error)
    req.flash('error','Something Went Wrong')
    return res.redirect('/login')
  }
}



exports.Recruitment_edit = async (req, res) => {
  try {
    const encoded=atob(req.params.id)
    const session=await loginModel.findOne({where:{role:req.session.user.role}})
    const data = await recruitmentModel.findOne({ where: { id: encoded } });
    const industry = await g_industryModel.findAll({ where: { status: 1 } });
    const skills = await skillModel.findAll({ where: { status: 1 } });
    console.log('edit recruitment-------->', data);

    // Parse the "data" field containing skills from JSON to an array
    // const d = JSON.parse(data.skills);
    // const d1=JSON.parse(d)
    const recDepart = await departmentModel.findAll({ where: { status: 1 } });
    return res.render('./clientdashboard/editRecruitment.ejs', {
      session:session,
      data: data,
      recDepart: recDepart,
      industry: industry,
      skills: skills,
      messages: req.flash(),
    });
  } catch (error) {
    console.log(error);
    req.flash('error', 'Something Went Wrong');
    return res.redirect('/login');
  }
};

exports.Recruitment_edit1=async(req,res)=>{
  try {
    const rBody=req.body
    console.log("------------->",rBody)
    const data=await recruitmentModel.update(rBody,{where:{id:req.params.id}})
    req.flash('success','Recruitment Updated SUccessfully')
    return res.redirect('/client/recruitmentView')
  } catch (error) {
    console.log(error)
    req.flash('error','Something Went Wrong')
    return res.redirect('/login')
  }
}
exports.Recruitment_delete=async(req,res)=>{
  try {
    const encoded=atob(req.params.id)

    const data=await recruitmentModel.destroy({where:{id:encoded}})
    req.flash('success','Recruitment Deleted Successfully')
    return res.redirect('/client/recruitmentView')
  } catch (error) {
    console.log(error)
    req.flash('error','Something Went Wrong')
    return res.redirect('/login')
  }
}



exports.editClient=async(req,res)=>{
  try {
    const session=await loginModel.findOne({where:{role:req.session.user.role}})

    const basic=await clientModel.findOne({where:{login_random:req.session.user.login_random}})
    const departmentData=await departmentModel.findAll({where:{status:1}})
    console.log(basic)
    return res.render('./clientdashboard/editClient.ejs',{session:session,basic:basic,departmentData:departmentData,messages:req.flash()})
  } catch (error) {
    console.log(error)
    req.flash('error','Something Went Wrong')
    return res.redirect('/login')
  }
}