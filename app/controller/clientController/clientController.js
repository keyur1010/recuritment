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

exports.clientPage = async (req, res) => {
  try {
    console.log("client page");
    const industry=await g_industryModel.findAll({where:{status:1}})
    const advref=await advert_refModel.findAll({where:{status:1}})
    const skills=await skillModel.findAll({where:{status:1}})
    const jobs=await g_jobModel.findAll({where:{status:1}})
    return res.render("./clientSign.ejs",{industry:industry,skills:skills,jobs:jobs,advref:advref});
  } catch (error) {
    console.log(error);
  }
};
exports.clientLogin = async (req, res) => {
  try {
    const candidateBody = req.body;
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
        client_random:randomString
      })
      
     
      for(var i=0;i<candidateBody.clientIndustry.length;i++){
        const m_industry=await m_clientModelIndustry.create({
          industry_id:candidateBody.clientIndustry[i],
          client_random:randomString
        })
      }
     
      for(var i=0;i<candidateBody.client_skills.length;i++){
        const m_skill=await m_clientSkillModel.create({
          skill_id:candidateBody.client_skills[i],
          client_random:randomString,

        })
        
      }
      for(var i=0;i<candidateBody.client_jobs.length;i++){
        const m_jobs=await m_clientJobModel.create({
          job_id:candidateBody.client_jobs[i],
          client_random:randomString,

        })
        
      }




      
      console.log("addClient----------------------->",addClient)
      return res.redirect('/login')
    // }else{
    //   console.log('data already in database go to login page')
    //   return res.redirect('/login')
    // }
  } catch (error) {
    console.log(error)
  }
};
