const { Sequelize, DataTypes, DATE,Op, where } = require("sequelize");
const db = require("../../../config/database");


const loginModel=db.loginModel
const clientPersonalModel = db.clientPersonalModel;
const m_clientSkillModel=db.m_clientSkillModel
const m_clientJobModel=db.m_clientJobModel
const m_clientModelIndustry=db.m_clientModelIndustry
const skillModel=db.skillModel
const g_jobModel=db.g_jobModel
const g_industryModel=db.g_industryModel
const advert_refModel=db.advert_refModel

exports.candidateDashboard = async (req, res) => {
  try {
    const clientRandom = req.session.user.login_random;

    // Fetch the candidate's personal data
    const data = await clientPersonalModel.findOne({ where: { client_random: clientRandom } });
console.log('-----------data',data)
    // Fetch the JSON data containing skill IDs and parse it
    const skillsData = JSON.parse(data.skills);
    console.log(skillsData)

    // Extract the skill IDs from the JSON

      const skillIds = skillsData.skill_id.map(Number);
      
      // Fetch the skills based on the extracted skill IDs
      const sData = await skillModel.findAll({ where: { id: skillIds } });



      const industryData=JSON.parse(data.allIndustry)
      const industryIds=industryData.industry_id.map(Number)
      const iData=await g_industryModel.findAll({where:{id:industryIds}})


      const jobData=JSON.parse(data.jobs)
      const jobIds=jobData.job_id.map(Number)
      const jbData=await g_jobModel.findAll({where:{id:jobIds}})
    // const sData=null

    // Fetch the candidate's job titles and industries as before
    const JD = await m_clientJobModel.findAll({ where: { client_random: clientRandom } });
    const jData = await Promise.all(JD.map(async (item) => {
      const RJob = await g_jobModel.findOne({ where: { id: item.job_id } });
      return RJob;
    }));

    const ID = await m_clientModelIndustry.findAll({ where: { client_random: clientRandom } });
    const IData = await Promise.all(ID.map(async (item) => {
      const Indust = await g_industryModel.findOne({ where: { id: item.industry_id } });
      return Indust;
    }));

    const AD = await advert_refModel.findAll({});
    const AllSkill = await skillModel.findAll({ where: { status: 1 } });
    const Allindusrty = await g_industryModel.findAll({ where: { status: 1 } });
    const AllJob = await g_jobModel.findAll({ where: { status: 1 } });

    return res.render('./candidate/candidateDashboard.ejs', {
      data: data,
      SD: sData,
      JD: jbData,
      ID: iData,
      AD: AD,
      jobData:jobData,
      skillsData:skillsData,
      AllSkill: AllSkill,
      Allindusrty: Allindusrty,
      AllJob: AllJob,
      
      messages: req.flash()
    });
  } catch (error) {
    console.log(error);
    req.flash('error', 'Something Went Wrong');
    return res.redirect('/login');
  }
};


exports.downloadFile=async(req,res)=>{
  try {
    const loginUser=await clientPersonalModel.findOne({where:{client_random:req.session.user.login_random}})
    console.log("this is login User-------->",loginUser)
    console.log("this is login User-------->",loginUser.upload_cv)
    const filePath='./public/uploads/'
    const fileName=loginUser.upload_cv
    const findFile=filePath +fileName
     return res.download(findFile, fileName, (err) => {
      if (err) {
        console.error(err);
        req.flash('error','File Not Downloaded ')
        return res.redirect('/candidate/candidate')
      } else {
        console.log('File downloaded successfully');
        req.flash('success','File Download SuccessFully')
        return res.redirect('/candidate/candidate')
      }
    });
    
  } catch (error) {
    console.log(error)
    req.flash('error','Something Went Wrong')
    return res.redirect('/login')
  }
}





exports.updateCandidate1=async(req,res)=>{
  try {
    console.log('---------------------->1keyur<-------------',req.files)
    console.log('----------------------req.body',req.files.profile_image)
    console.log("3",req.files)
    if(req.files){
      console.log(req.body)
      const {candidate_name,advert_ref,mobile_number,email_id,passport,candidate_dob,driver_car_owner,dbs,current_salary,desired_salary,notice_period,current_pay_status,reason_for_leave,current_position}=req.body
      if(req.files.profile_image &&  req.files.upload_cv){
        console.log('This is req.files1------------>',req.file)
        console.log('This is req.files2------------>',req.files)
      const profileImage = req.files['profile_image'][0];
      const uploadCV = req.files['upload_cv'][0];

        const updateClient1={
          candidate_name:candidate_name,
          advert_ref:advert_ref,
          mobile_number:mobile_number,
          email_id:email_id,
          passport:passport,
          candidate_dob:candidate_dob,
          driver_car_owner:driver_car_owner,
          dbs:dbs,
          profile_image:profileImage.filename,
          upload_cv:uploadCV.filename,   
          current_salary:current_salary,
          desired_salary:desired_salary,
          notice_period:notice_period,
          current_pay_status:current_pay_status,
          reason_for_leave:reason_for_leave,
          current_position:current_position,
        }
  console.log("candidate dashboard fil2e-------------->",updateClient1)
  
        const updateClient=await clientPersonalModel.update(updateClient1,{where:{client_random:req.session.user.login_random}})
        console.log('candidate dashboard file-------------->',updateClient)
        req.flash('success','Data Updated Successfully')
        return res.redirect('/candidate/candidate')
      }

      
      else if(req.files.upload_cv){
      const uploadCV = req.files['upload_cv'][0];

        const updateClient1={
          candidate_name:candidate_name,
          advert_ref:advert_ref,
          mobile_number:mobile_number,
          email_id:email_id,
          passport:passport,
          candidate_dob:candidate_dob,
          driver_car_owner:driver_car_owner,
          dbs:dbs,
          // profile_image:profileImage.filename,
          upload_cv:uploadCV.filename,   
          current_salary:current_salary,
          desired_salary:desired_salary,
          notice_period:notice_period,
          current_pay_status:current_pay_status,
          reason_for_leave:reason_for_leave,
          current_position:current_position,
        }
  console.log("candidate dashboard fil2e-------------->",updateClient1)
  
        const updateClient=await clientPersonalModel.update(updateClient1,{where:{client_random:req.session.user.login_random}})
        console.log('candidate dashboard file-------------->',updateClient)
        req.flash('success','Data Updated Succesfully')

        return res.redirect('/candidate/candidate')
      }else if(req.files.profile_image){
        const profileImage = req.files['profile_image'][0];
  
          const updateClient1={
            candidate_name:candidate_name,
            advert_ref:advert_ref,
            mobile_number:mobile_number,
            email_id:email_id,
            passport:passport,
            candidate_dob:candidate_dob,
            driver_car_owner:driver_car_owner,
            dbs:dbs,
            profile_image:profileImage.filename,
            // upload_cv:uploadCV.filename,   
            current_salary:current_salary,
            desired_salary:desired_salary,
            notice_period:notice_period,
            current_pay_status:current_pay_status,
            reason_for_leave:reason_for_leave,
            current_position:current_position,
          }
    console.log("candidate dashboard fil2e-------------->",updateClient1)
    
          const updateClient=await clientPersonalModel.update(updateClient1,{where:{client_random:req.session.user.login_random}})
          console.log('candidate dashboard file-------------->',updateClient)
          req.flash('success','Data Updated Succesfully')
          return res.redirect('/candidate/candidate')
        }
      else {
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
         const upDAta=await clientPersonalModel.update(candidateBody,{where:{client_random:req.session.user.login_random}}) 
         console.log("candidate dashboard file1-------------->",upDAta)
         req.flash('success','Candidate Data Updated successfully ')
     return res.redirect('/candidate/candidate')
    

    }}
  }catch(e){
    console.log('e',e)
    req.flash('error','Something Went Wrong')
    return res.redirect('/login')
  }}

exports.updateCandidate2=async(req,res)=>{
  try {
    const cand2=req.body
    const data=await clientPersonalModel.update(cand2,{where:{client_random:req.session.user.login_random}})
    req.flash('success','Candidate Updated Successfully')
    return res.redirect('/candidate/candidate')
  } catch (error) {
    console.log(error)
    req.flash('error','Something Went Wrong')
    return res.redirect('/login')
  }
}

exports.updateCandidate3=async(req,res)=>{

  try {
    const cand3=req.body
    const data=await clientPersonalModel.update(cand3,{where:{client_random:req.session.user.login_random}})
    req.flash('success','Candidate Updated Successfully')
    return res.redirect('/candidate/candidate')
  } catch (error) {
    console.log(error)
    req.flash('error','Something Went Wrong')
    return res.redirect('/login')
  }
}



exports.updateCandidate4=async(req,res)=>{
  try {
    const cand4=req.body
    const editedSkills = req.body.candidate_skills;
  const updatedSkillsData = {
    skill_id: editedSkills
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
    console.log('update form333------->',allIndustry,updatedSkillsData,allJob,updatedSkillsJSON)
    const can4={
      driver:cand4.driver,
      avail_for_emg_shift:cand4.avail_for_emg_shift,
      jobs:allJob,
      allIndustry:allIndustry,
      skills:updatedSkillsData,
    }
    console.log(can4)
    const data=await clientPersonalModel.update(can4,{where:{client_random:req.session.user.login_random}})
    req.flash('success','Candidate Data Updated')
    return res.redirect('/candidate/candidate')
    
  } catch (error) {
    console.log(error)
    req.flash('error','Something Went Wrong')
    return res.redirect('/login')
  }
}






