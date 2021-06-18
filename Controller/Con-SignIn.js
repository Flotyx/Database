const express=require('express')
const SQLclient=require('../DB_Connection').db
const bcrypt= require('bcrypt')
const {body,validationResult}= require('express-validator');

//前面已經檢查了gmail format 有沒有對，所以接下來要做的：
//1.檢查是不是空的
//2.檢查gmail是否存在（不存在的話就是輸入錯誤或者就是真的沒有這個gmail)
//3.檢查password有沒有對

module.exports.SignIn=(req,res)=>{
    const{email,password}=req.body//拿到輸入的email
    console.log(email)
    const errorMessage=validationResult(req)
    
    if(!errorMessage.isEmpty())//這個就是在auth那裏偵測到的錯誤，就不用再檢查其他的直接render
    {
        res.render('../Auth/Auth-SignIn'),{
            errorMsg:errorMessage.array[0].msg//用view engine 顯示出來
        }
    }
    //開始驗證輸入的email是否有問題？什麽問題？
    else
    {   
        if(req.length<=0)
        {   
            errorMessage="Email or Password cannot be empty!!!"
            res.render('../Auth/Auth-SignIn'),{
                errorMsg:errorMessage.array[0].msg//用view engine 顯示出來
            }
        }

        else
        {//user 有輸入password
            SQLclient.execute("select MB_Email from `member`" ,(err,result)=>{
                if(err)
                {throw err;}
                const dbemail=result;
                console.log(dbemail[0]);
                if(email!=dbemail)
            {
                errorMessage="Gmail is incorrect or does not exist"
                res.render('../Auth/Auth-SignIn'),{
                    errorMsg:errorMessage.array[0].msg
                }
            }
            })
                SQLclient.execute("select * from `member` where MB_Password=?,"[password])
                .then(result,err)
                    {
                        const dbresult=result;
                        console.log(dbresult[0]);
                    }
                    if(dbresult!=undefined&&password!=defined)
                    {
                         {//cannot bcrypt compare when one is undefined
                            bcrypt.compare(password,dbresult)
                                .then((result)=>{
                                    if(result){
                                        //JWT-user info
                                        const JWT_INFO={
                                            user_id:dbresult[0].MB_Id,
                                            user_password:dbresult[0].MB_Password,
                                            user_name:dbresult[0].MB_Name,
                                            user_access:dbResult[0].IsAdmin
                                        }
                                        const user_JWT=JWT.sign(JWT_INFO,process.env_ACCESS_JWT,{
                                            expiresIn="1h"
                                        })
                                        // the cookie should expire when the JWT expires
                                        // const cookie_option={
                                        //     expires:
                                        // }

                                    }
                                    else
                                    errorMessage="Password is incorrect"
                                    res.render('../Auth/Auth-SignIn'),{
                                        errorMsg:errorMessage.array[0].msg
                                    }
                                })
                                .catch(err=>{
                                    console.log(err)
                                })
                        }
                    }  
                    else
                    {
                        console.log("DBresult is undefined or password is undefined")
                    } 
        }
        
    }
}




