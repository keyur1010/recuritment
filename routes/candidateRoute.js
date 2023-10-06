const express=require('express')
const router=express.Router()
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





router.get('/candidate',candidateController.candidateDashboard)

router.post('/updateCandidate1',upload.fields([{name:"profile_image"},{name:"upload_cv"}]),candidateController.updateCandidate1)
router.post('/updateCandidate2',candidateController.updateCandidate2)
router.post('/updateCandidate3',candidateController.updateCandidate3)




module.exports=router
