const { Sequelize, DataTypes, DATE,Op, where } = require("sequelize");
const db = require("../../../config/database");
const md5=require('md5')


const loginModel=db.loginModel
const clientModel = db.clientModel;


exports.adminDashboard=async(req,res)=>{
    try {
        return res.render('./lowadmin/lowadmindashboard.ejs')
    } catch (error) {
        console.log(error)
    }
}
exports.simpleClient=async(req,res)=>{
    try {
        return res.render('./lowadmin/clientAdd.ejs')
    } catch (error) {
        console.log(error)
    }
}
exports.m_clientList=async(req,res)=>{
    try {
        const clientData=await  clientModel.findAll({where:{isDeleted:0}})

        return res.render('./lowadmin/adminclientList.ejs',{clientData:clientData})
    } catch (error) {
        console.log(error)
    }
}
exports.m_newClientCreate=async(req,res)=>{
    try {
        const {
          client_name,type,registered_address,contract_name,contract_position,contract_number,contract_mobile,contract_email,website,industry,vat_number,registration_no,client_logo,img_url,subscrption_level_agreed,payroll_subsribe,employement_contract,service,services,finance_name,finance_position,finance_number,finance_mobile,finance_email,finance_credit_limit,finance_debit_details,billing_name,billing_position,billing_number,billing_mobile,billing_email,
        } = req.body;
         const hashedPassword=md5('123456')
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
          login_random:randomString,
          insertBy:req.session.user.id,
        
        });
        const clietLogin=await loginModel.create({
          email:contract_email,
          password:hashedPassword,
          role:"Client",
          login_random:randomString
        })
        // console.log("data---------->", data);
        
        
        return res.redirect('/m_admin/m_clientList');
      } catch (error) {
        console.log(error);
      }
}

exports.m_approveBtn=async(req,res)=>{
    try {
      const data=await clientModel.findOne({where:{id:req.params.id}})
      if(data.admin_status=="Pending"){
        const updatebtn=await clientModel.update({admin_status:"Approved"},{where:{
          id:req.params.id
        }})  
        return res.redirect('/m_admin/m_clientList')
  
      }  
      else if(data.admin_status=="Approved"){
        const updatebtn=await clientModel.update({admin_status:"Pending"},{where:{
          id:req.params.id
        }})  
        return res.redirect('/m_admin/m_clientList')
  
     
      }  
      else{
        console.log('error on update')
        return res.redirect('/m_admin/m_clientList')
      }  
    } catch (error) {
      console.log(error)
    }  
  }  


exports.m_clientDelete=async(req,res)=>{
    try {
        const data=await clientModel.update({isDeleted:1},{where:{id:req.params.id}})
        return res.redirect('/m_admin/m_clientList')
      } catch (error) {
        console.log(error)
      }
}

exports.m_clientEdit=async(req,res)=>{
    try {
      const data=await clientModel.findOne({where:{id:req.params.id}})
      console.log('data-------------------------->',data)
      const json_data=JSON.parse(data.dataValues.services)
      // console.log(service_data)
      // const json_data=JSON.parse(service_data)
      console.log(json_data)
        
        console.log('data',json_data)
        return res.render('./lowadmin/m_clientEdit.ejs',{data:data,json_data:json_data})
    } catch (error) {
      console.log(error)
    }
  }


  exports.m_clientEdit1=async(req,res)=>{
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
      return res.redirect(`/m_admin/m_clientEdit/${req.params.id}`)
      }
      else{
  
        const newBody=req.body
        const data=await clientModel.findOne({where:{id:req.params.id}})
        console.log('client edit 1------------->',data)
        const updateForm1=await clientModel.update(newBody,{ where: { id: req.params.id } })
        return res.redirect(`/m_admin/m_clientEdit/${req.params.id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }
  exports.m_clientEdit2=async(req,res)=>{
    try {
      const newData=req.body
      const data=await clientModel.findOne({where:{id:req.params.id}})
      console.log('data2------------------>',data)
      const updateForm2=await clientModel.update(newData,{where:{id:req.params.id}})
      return res.redirect(`/m_admin/m_clientEdit/${req.params.id}`)
    } catch (error) {
      console.log(error)
    }
  }
  
  
  exports.m_clientEdit3=async(req,res)=>{
    try {
      const newData=req.body
      const data=await clientModel.findOne({where:{id:req.params.id}})
      console.log('data3------------------>',data)
      const updateForm2=await clientModel.update(newData,{where:{id:req.params.id}})
      return res.redirect(`/m_admin/m_clientEdit/${req.params.id}`)
    } catch (error) {
      console.log(error)
    }
  }
  