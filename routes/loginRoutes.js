const express=require('express')
const router=express.Router()
const auth=require('../app/middleware/auth')
const  loginController=require('../app/controller/loginController')



router.get('/login',loginController.loginPage)
router.post('/loginUser',loginController.loginUser)

router.get('/',loginController.logout)











module.exports=router
