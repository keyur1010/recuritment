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
const adminController=require('../app/controller/adminController/adminController');
const { candidateDashboard } = require('../app/controller/candidateController/candidateController');



router.get('/admindashboard',auth.login,adminController.adminDashboard)

router.get('/newclient',auth.login,adminController.newClient)      //new client create by admin
router.post('/newclientcreate',auth.login, upload.single('client_logo'), adminController.newClientCreate);

router.get('/clientDelete/:id',auth.login,adminController.clientDelete)

// router.get('/findData',adminController.findData)

router.get('/adminDepartment',auth.login,adminController.adminDepartment)
router.post('/m_department',auth.login,adminController.Save_m_departments)

router.get('/editDepartment/:id',auth.login,adminController.editDepartment)
router.post('/editDepartment1/:id',auth.login,adminController.editDepartment1)
router.get('/deleteDepartment/:id',auth.login,adminController.deleteDepartment)


// router.get('/addCompany',adminController.addCompany)
// router.post('/saveAddCompany',upload.single('company_logo'),adminController.saveAddCompany)
// router.get('editCompany/:id',adminController.editCompany)
// router.get('/companyList',adminController.companyList)
router.get('/editCompany',auth.login,adminController.editCompany)
router.post('/editCompany1/:id',auth.login,upload.single('company_logo'),adminController.editCompany1)



router.get('/fin_years',auth.login,adminController.fin_years)
router.post('/Save_fin_year',auth.login,adminController.Save_fin_year)

router.get('/edit_fin_year/:id',auth.login,adminController.edit_fin_year)
router.post('/edit_fin_year1/:id',auth.login,adminController.edit_fin_year1)
router.get('/Delete_fin_year/:id',auth.login,adminController.Delete_fin_year)





router.get('/g_jobpage',auth.login,adminController.g_jobpage)
router.post('/g_jobAdd',auth.login,adminController.g_jobAdd)
router.get('/jobTItleEdit/:id',auth.login,adminController.jobTItleEdit)
router.post("/g_jobEdit/:id",auth.login,adminController.g_jobEdit)
router.get('/Delete_jobtitles/:id',auth.login,adminController.Delete_jobtitles)







router.get('/m_industry',auth.login,adminController.m_industry)
router.post('/Save_m_industry',auth.login,adminController.Save_m_industry)

router.get('/edit_m_industry/:id',auth.login,adminController.edit_m_industry)
router.post('/g_industryEdit/:id',auth.login,adminController.g_industryEdit)

router.get('/Delete_m_industry/:id',auth.login,adminController.Delete_m_industry)




router.get('/m_skillPage',auth.login,adminController.m_skillPage)
router.post('/Save_m_skills',auth.login,adminController.Save_m_skills)

router.get('/edit_m_skills/:id',auth.login,adminController.edit_m_skills)
router.post('/edit_m_skills1/:id',auth.login,adminController.edit_m_skills1)
router.get('/Delete_m_skills/:id',auth.login,adminController.Delete_m_skills)





router.get('/ad_ref_page',auth.login,adminController.ad_ref_page)
router.post('/Save_m_advert_ref',auth.login,adminController.Save_m_advert_ref)
router.get('/edit_m_advertPage/:id',auth.login,adminController.edit_m_advertPage)
router.post('/edit_m_advert_ref/:id',auth.login,adminController.edit_m_advert_ref)
router.get('/Delete_m_advert_ref/:id',auth.login,adminController.Delete_m_advert_ref)






router.get('/adminEmployee',auth.login,adminController.adminEmployee)
router.get('/adminAddEmployee',auth.login,adminController.adminAddEmployee)
router.post('/AdminAddEmployee1',auth.login,upload.single('image_url'),adminController.AdminAddEmployee1)
router.post('/Reset_Password/:id',auth.login,adminController.Reset_Password)
router.get('/employeeView/:id',auth.login,adminController.employeeView)
router.post('/employeeViewEdit/:id',auth.login,upload.single('image_url'),adminController.employeeViewEdit)



router.get('/candidateList',auth.login,adminController.candidateList)
router.get('/Approve_accept_candidate/:id',auth.login,adminController.Approve_accept_candidate)
router.get('/Reject_accept_candidate/:id',auth.login,adminController.Reject_accept_candidate)
router.get('/candidateView/:id',adminController.candidateView)
router.post('/updateCandidate1/:id',auth.login,upload.fields([{name:"profile_image"},{name:"upload_cv"}]),adminController.updateCandidate1)
router.post('/updateCandidate2/:id',auth.login,adminController.updateCandidate2)
router.post('/updateCandidate3/:id',auth.login,adminController.updateCandidate3)
router.post('/updateCandidate4/:id',auth.login,adminController.updateCandidate4)


router.get('/clientList',auth.login,adminController.clientList)

router.get('/clientEdit/:id',auth.login,adminController.clientEdit)

router.get('/approveBtn/:id',auth.login,adminController.approveBtn)
router.post('/clientEdit1/:id',auth.login,upload.single('client_logo'),adminController.clientEdit1)
router.post('/clientEdit2/:id',auth.login,adminController.clientEdit2)
router.post('/clientEdit3/:id',auth.login,adminController.clientEdit3)























module.exports=router