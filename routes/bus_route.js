const express=require('express');
const bus=require('../modules/bus_model');

const router=express.Router();


router.post('/register',function(req,res){
    const fn1= req.body.fn;
    const ln1=req.body.ln;
    const em1=req.body.em;
    const ph1=req.body.ph;
    const pwd1=req.body.pwd;

    console.log(req.body)
    const data=new bus({fname:fn1,lname:ln1,email:em1,phoneno:ph1,password:pwd1});
    data.save();
})
//update
module.exports=router;