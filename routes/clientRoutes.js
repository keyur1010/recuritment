const express=require('express')
const router=express.Router()
const  clientController=require('../app/controller/clientController/clientController')



router.get('/client',clientController.clientPage)













module.exports=router
