const express=require('express')
const router=express.Router()
const  loginController=require('../app/controller/loginController')



router.get('/login',loginController.loginPage)
router.post('/loginUser',loginController.loginUser)













module.exports=router
