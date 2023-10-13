const express=require('express')
const router=express.Router()

const candidateauth=require('../app/middleware/candidateauth')


const multer=require("multer")
const candidateController=require("../app/controller/candidateController/candidateController")
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





router.get('/candidate',candidateauth.login,candidateController.candidateDashboard)

router.get('/downloadFile',candidateController.downloadFile)


router.post('/updateCandidate1',candidateauth.login,upload.fields([{name:"profile_image"},{name:"upload_cv"}]),candidateController.updateCandidate1)
router.post('/updateCandidate2',candidateauth.login,candidateController.updateCandidate2)
router.post('/updateCandidate3',candidateauth.login,candidateController.updateCandidate3)

router.post('/updateCandidate4',candidateauth.login,candidateController.updateCandidate4)







module.exports=router
