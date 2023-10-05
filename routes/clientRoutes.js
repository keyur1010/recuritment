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












module.exports=router
