const express=require('express')
const router=express.Router()
const multer=require("multer")
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



router.get('/simpleAdmin',simpleAdminController.adminDashboard)
router.get('/clientAdd',simpleAdminController.simpleClient)
router.get('/m_clientList',simpleAdminController.m_clientList)
router.post('/m_newClientCreate',upload.single('client_logo'),simpleAdminController.m_newClientCreate)
router.get('/m_approveBtn/:id',simpleAdminController.m_approveBtn)
router.get('/m_clientDelete/:id',simpleAdminController.m_clientDelete)
router.get('/m_clientEdit/:id',simpleAdminController.m_clientEdit)
router.post('/m_clientEdit1/:id',upload.single('client_logo'),simpleAdminController.m_clientEdit1)
router.post('/m_clientEdit2/:id',simpleAdminController.m_clientEdit2)
router.post('/m_clientEdit3/:id',simpleAdminController.m_clientEdit3)









module.exports=router
