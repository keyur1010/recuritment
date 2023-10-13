const express=require('express')
const router=express.Router()
const multer=require('multer')
const  clientController=require('../app/controller/clientController/clientController')
const clientAuth=require('../app/middleware/clientAuth')

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads'); // Specify the upload directory
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Rename the file
    },
  });
  
  
const upload = multer({ storage: storage });



router.get('/client',clientController.clientPage)
router.post('/saveCandidate',upload.fields([{name:"profile_image"},{name:"upload_cv"}]),clientController.clientLogin)
router.get('/thanku',clientController.thanku)




router.get('/clientView',clientAuth.login,clientController.clientView)

router.get('/recruitmentView',clientAuth.login,clientController.recruitmentView)
router.get('/addRecruitment',clientAuth.login,clientAuth.login,clientController.addRecruitment)
router.post('/saveRecruitment',clientAuth.login,clientController.saveRecruitment)
router.get('/Recruitment_edit/:id',clientAuth.login,clientController.Recruitment_edit)
router.post('/Recruitment_edit1/:id',clientAuth.login,clientController.Recruitment_edit1)
router.get('/Recruitment_delete/:id',clientAuth.login,clientController.Recruitment_delete)


router.get('/editClient',clientController.editClient)


module.exports=router
