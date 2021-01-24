const express=require('express');
const User=require('../modules/user_model');
//const {router}=require('./user_route');
const router=express.Router();
//for validation our user data
const{check,validationResult}=require('express-validator');
//for password descryption
const bcryptjs=require('bcryptjs');
const { find } = require('../modules/user_model');

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
    data.save()
    .then(
        function(result){
            res.status(201).json({message:"your registration successful!!"})
        }
    )
    .catch(function(err1){
        res.status(500).json({message :err1})
    })
    })
}
    else{
        //invalid
        res.status(400).json(validationErr.array())
    }



})

router.get('/user/login',function(req,res){
    
    const username= req.body.username;//fetch data fromform
    const password=req.body.password;//fetch data from form
    User.findOne({username:username}).
    then(
        function(userData){
            if(userData==null){
                //your id was not found
                return res.status(403).json({message:"invalid login"})
            }
            //user found
            bcryptjs.compare(userData.password,password,function(err,result1){
                if(result1===false){
                    return res.status(403).json({message:"username or password was not found"})
                }
                res.send("correct!!")
            })
        }

    )
    .catch()
})


//update
module.exports=router;