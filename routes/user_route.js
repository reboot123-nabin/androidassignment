const express=require('express');
const User=require('../modules/user_model');
//const {router}=require('./user_route');
const router=express.Router();
//for validation our user data
const{check,validationResult}=require('express-validator');
//for password descryption
const bcryptjs=require('bcryptjs')

router.post('/user/insert',[
    check('username','Username is required').not().isEmpty(),
    check('address','address is required!!').not().isEmpty(),
    check('password','password is required!!').not().isEmpty()
],function(req,res){

    const validationErr=validationResult(req);
    //console.log();
    //res.send(validationErr.array());//send data to postman
    if(validationErr.isEmpty()){
    //valid
    
        const username= req.body.username;//fetch data fromform
    const password=req.body.password;//fetch data from form
    const address=req.body.address;
    bcryptjs.hash(password,10,function(err,hash_pw){
        //res.send(hash_pw)
        
    const data=new User({username:username,address:address,password:hash_pw})


    data.save();
    })

    }
    else{
        //invalid
        res.send(validationErr.array())
    }


})
//update
module.exports=router;