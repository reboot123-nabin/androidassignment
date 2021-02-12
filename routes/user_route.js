const express=require('express');
const User=require('../modules/user_model');
//const {router}=require('./user_route');
const router=express.Router();
//for validation our user data
const{check,validationResult}=require('express-validator');
//for password descryption
const bcryptjs=require('bcryptjs');
const { find } = require('../modules/user_model');
const jwt=require('jsonwebtoken');

router.post('/user/insert',[
    check('username','Username is required').not().isEmpty(),
    //check('address','address is required!!').not().isEmpty(),
    check('password','password is required!!').not().isEmpty()
],function(req,res){

    const validationErr=validationResult(req);
    //console.log();
    //res.send(validationErr.array());//send data to postman
    if(validationErr.isEmpty()){
    //valid
    
    const username= req.body.username;//fetch data fromform
    const password=req.body.password;//fetch data from form
    //const address=req.body.address;
    const userType=req.body.userType;
    bcryptjs.hash(password,10,function(err,hash_pw){
        //res.send(hash_pw)
        
    const data=new User({username:username,password:hash_pw,userType:userType})
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

router.post('/user/login',function(req,res){
    const username= req.body.username;//fetch data fromform
    const password=req.body.password;//fetch data from form
    console.log(req.body);
    User.findOne({username:username}).
    then(
        function(userData){
           
            if(userData==null){
                //your id was not found
                return res.status(403).json({message:"invalid login"})
            }
            //user found
            bcryptjs.compare(password,userData.password,function(err,result1){
                if(result1===false){
                    return res.status(403).json({message:"username or password was not found"})
                }
                //username and password valid
                //res.send("correct!!")

                //token generate
                const token=jwt.sign({userId:userData._id},'secretkey')
                res.status(200).json({
                    t:token,
                    message:"authon sucessful",
                })


            })
        }

    )
    .catch(function(e){
        res.status(500).json({error:e});
    })
})


router.get("Description/all",function(req,res){
    News.find().then(function(data){
        res.status(200).json(data);
    }).catch(function(er){
        res.status(500).json({error:er})
    })
})


router.get("Description/single/:id")

//update
module.exports=router;