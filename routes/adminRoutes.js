const express =require('express')
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



const auth=require('../app/middleware/auth')
const adminController=require('../app/controller/adminController/adminController')
router.get('/admindashboard',adminController.adminDashboard)

router.get('/newclient',adminController.newClient)      //new client create by admin
router.post('/newclientcreate', upload.single('client_logo'), adminController.newClientCreate);

router.get('/clientDelete/:id',adminController.clientDelete)

// router.get('/findData',adminController.findData)

router.get('/adminDepartment',adminController.adminDepartment)
router.post('/m_department',adminController.Save_m_departments)

router.get('/editDepartment/:id',adminController.editDepartment)
router.post('/editDepartment1/:id',adminController.editDepartment1)
router.get('/deleteDepartment/:id',adminController.deleteDepartment)


router.get('/addCompany',adminController.addCompany)
router.post('/saveAddCompany',upload.single('company_logo'),adminController.saveAddCompany)
router.get('editCompany/:id',adminController.editCompany)
router.get('/companyList',adminController.companyList)
router.get('/editCompany/:id',adminController.editCompany)
router.post('/editCompany1/:id',upload.single('company_logo'),adminController.editCompany1)



router.get('/fin_years',adminController.fin_years)
router.post('/Save_fin_year',adminController.Save_fin_year)

router.get('/edit_fin_year/:id',adminController.edit_fin_year)
router.post('/edit_fin_year1/:id',adminController.edit_fin_year1)
router.get('/Delete_fin_year/:id',adminController.Delete_fin_year)





router.get('/g_jobpage',adminController.g_jobpage)
router.post('/g_jobAdd',adminController.g_jobAdd)
router.get('/jobTItleEdit/:id',adminController.jobTItleEdit)
router.post("/g_jobEdit/:id",adminController.g_jobEdit)
router.get('/Delete_jobtitles/:id',adminController.Delete_jobtitles)







router.get('/m_industry',adminController.m_industry)
router.post('/Save_m_industry',adminController.Save_m_industry)

router.get('/edit_m_industry/:id',adminController.edit_m_industry)
router.post('/g_industryEdit/:id',adminController.g_industryEdit)

router.get('/Delete_m_industry/:id',adminController.Delete_m_industry)




router.get('/m_skillPage',adminController.m_skillPage)
router.post('/Save_m_skills',adminController.Save_m_skills)

router.get('/edit_m_skills/:id',adminController.edit_m_skills)
router.post('/edit_m_skills1/:id',adminController.edit_m_skills1)
router.get('/Delete_m_skills/:id',adminController.Delete_m_skills)





router.get('/ad_ref_page',adminController.ad_ref_page)
router.post('/Save_m_advert_ref',adminController.Save_m_advert_ref)
router.get('/edit_m_advertPage/:id',adminController.edit_m_advertPage)
router.post('/edit_m_advert_ref/:id',adminController.edit_m_advert_ref)
router.get('/Delete_m_advert_ref/:id',adminController.Delete_m_advert_ref)






router.get('/adminEmployee',adminController.adminEmployee)
router.get('/adminAddEmployee',adminController.adminAddEmployee)
router.post('/AdminAddEmployee1',upload.single('image_url'),adminController.AdminAddEmployee1)
router.get('/employeeView/:id',adminController.employeeView)
router.post('/employeeViewEdit/:id',upload.single('image_url'),adminController.employeeViewEdit)



router.get('/candidateList',adminController.candidateList)

router.get('/clientList',adminController.clientList)

router.get('/clientEdit/:id',adminController.clientEdit)

router.get('/approveBtn/:id',adminController.approveBtn)
router.post('/clientEdit1/:id',upload.single('client_logo'),adminController.clientEdit1)
router.post('/clientEdit2/:id',adminController.clientEdit2)
router.post('/clientEdit3/:id',adminController.clientEdit3)























module.exports=router