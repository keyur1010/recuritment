const express=require('express')
const router=express.Router()
const multer=require("multer")
const simpleadmin=require('../app/middleware/simpleAdminauth')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads'); // Specify the upload directory
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Rename the file
    },
  });
  
  // Initialize Multer with the storage configuration
  const upload = multer({ storage: storage });


const simpleAdminController=require("../app/controller/adminController/lowAdminController")



router.get('/simpleAdmin',simpleadmin.login,simpleAdminController.adminDashboard)
router.get('/clientAdd',simpleadmin.login,simpleAdminController.simpleClient)
router.get('/m_clientList',simpleadmin.login,simpleAdminController.m_clientList)
router.post('/m_newClientCreate',simpleadmin.login,upload.single('client_logo'),simpleAdminController.m_newClientCreate)
router.get('/m_approveBtn/:id',simpleadmin.login,simpleAdminController.m_approveBtn)
router.get('/m_clientDelete/:id',simpleadmin.login,simpleAdminController.m_clientDelete)
router.get('/m_clientEdit/:id',simpleadmin.login,simpleAdminController.m_clientEdit)
router.post('/m_clientEdit1/:id',simpleadmin.login,upload.single('client_logo'),simpleAdminController.m_clientEdit1)
router.post('/m_clientEdit2/:id',simpleadmin.login,simpleAdminController.m_clientEdit2)
router.post('/m_clientEdit3/:id',simpleadmin.login,simpleAdminController.m_clientEdit3)









module.exports=router
