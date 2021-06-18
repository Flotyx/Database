//submit 了過後就要檢查Sign In 是不是對的(就是還沒去到資料庫那裏檢查(去的路上要檢查))
const express=require("express")
const router=express.Router()
const AuthControler=require('../Controller/Con-SignIn')
const {check,body}=require("express-validator")

router.post('./SignIn',[
    check()
    .isEmail()
    .withMsg("The email format is wrong")
    .trim()//remove the whitespace
    .normalize() 
],AuthControler.SignIn)//後續檢查動作

module.exports=router

