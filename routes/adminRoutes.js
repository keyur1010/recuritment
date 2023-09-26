const express =require('express')
const router=express.Router()
const adminController=require('../app/controller/adminController/adminController')
router.get('/admindashboard',adminController.adminDashboard)

router.get('/newclient',adminController.newClient)      //new client create by admin
router.post('/newclientcreate',adminController.newClientCreate)


router.get('/adminDepartment',adminController.adminDepartment)

router.post('/m_department',adminController.Save_m_departments)



module.exports=router