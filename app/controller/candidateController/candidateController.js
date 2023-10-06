const { Sequelize, DataTypes, DATE,Op, where } = require("sequelize");
const db = require("../../../config/database");



const clientPersonalModel = db.clientPersonalModel;
const m_clientSkillModel=db.m_clientSkillModel
const m_clientJobModel=db.m_clientJobModel
const m_clientModelIndustry=db.m_clientModelIndustry
const skillModel=db.skillModel
const g_jobModel=db.g_jobModel
const g_industryModel=db.g_industryModel
const advert_refModel=db.advert_refModel

exports.candidateDashboard=async(req,res)=>{
    try {
        console.log('req.session.user',req.session.user.login_random)
        console.log('hi')
        const data=await clientPersonalModel.findOne({where:{client_random:req.session.user.login_random}})
        console.log('client_random for skill',data.client_random)
        const SD=await m_clientSkillModel.findAll({where:{client_random:data.client_random}})
        const sData = await Promise.all(SD.map(async (item) => {
            console.log('Skill ID:', item.skill_id);
            const RSkill = await skillModel.findOne({ where: { id: item.skill_id } });
            console.log(RSkill);
            return RSkill;
          }));


          const JD=await m_clientJobModel.findAll({where:{client_random:data.client_random}})

          const jData = await Promise.all(JD.map(async (item) => {
            
            const RJob = await g_jobModel.findOne({ where: { id: item.job_id } });
            
            console.log(RJob);
            return RJob;
          }));





          const ID=await m_clientModelIndustry.findAll({where:{client_random:data.client_random}})

          const IData = await Promise.all(ID.map(async (item) => {
            
            const Indust = await g_industryModel.findOne({ where: { id: item.industry_id } });
            
            console.log(Indust);
            return Indust;
          }));
          const AD=await advert_refModel.findAll({})
          
          const AllSkill=await skillModel.findAll({where:{status:1}})
        return res.render('./candidate/candidateDashboard.ejs',{data:data,SD:sData,JD:jData,ID:IData,AD:AD,AllSkill:AllSkill})
    } catch (error) {
        console.log(error)
    }
}


exports.updateCandidate1=async(req,res)=>{
  try {
    console.log('----------------------req.body',req.body)
    console.log("1q",req.file)
    console.log("3",req.files)
    if(req.files){
      console.log(req.body)
      const {candidate_name,advert_ref,mobile_number,email_id,passport,candidate_dob,driver_car_owner,dbs,current_salary,desired_salary,notice_period,current_pay_status,reason_for_leave,current_position}=req.body
      if(req.files.profile_image){
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
        return res.redirect('/candidate/candidate')
      }else if(req.files.upload_cv){
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
        return res.redirect('/candidate/candidate')
      }else{
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
        return res.redirect('/candidate/candidate')
      }
    

    }
   else if(!req.file){
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
return res.redirect('/candidate/candidate')
    } else{
      console.log("file not updated")
      return res.redirect('/candidate/candidate')
    }
      
     
    


  } catch (error) {
    console.log(error)
  }
}

exports.updateCandidate2=async(req,res)=>{
  try {
    const cand2=req.body
    const data=await clientPersonalModel.update(cand2,{where:{client_random:req.session.user.login_random}})
    return res.redirect('/candidate/candidate')
  } catch (error) {
    console.log(error)
  }
}
exports.updateCandidate3=async(req,res)=>{

  try {
    const cand3=req.body
    const data=await clientPersonalModel.update(cand3,{where:{client_random:req.session.user.login_random}})
    return res.redirect('/candidate/candidate')
  } catch (error) {
    console.log(error)
  }
}








