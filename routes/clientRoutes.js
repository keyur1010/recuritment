const express=require('express')
const router=express.Router()
const multer=require('multer')
const  clientController=require('../app/controller/clientController/clientController')


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

router.get('/clientView',clientController.clientView)

router.get('/recruitmentView',clientController.recruitmentView)
router.get('/addRecruitment',clientController.addRecruitment)
router.post('/saveRecruitment',clientController.saveRecruitment)
router.get('/Recruitment_edit/:id',clientController.Recruitment_edit)
router.post('/Recruitment_edit1/:id',clientController.Recruitment_edit1)
router.get('/Recruitment_delete/:id',clientController.Recruitment_delete)



module.exports=router
