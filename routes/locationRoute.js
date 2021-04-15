const express=require('express');
const Location=require('../modules/LocationModel');

const router=express.Router();
const auth=require('../middleware/auth');


router.post('/location/insert',function(req,res){

     const destination=req.body.destination
     const from=req.body.from;
 
     const date=req.body.date;
     
     console.log(req.body)
 
     console.log(req.body.nimage)

     const ndata=new Location({
         destination:destination,
      
         from:from,
         date:date,
        
     })
 
 ndata.save()
 .then(function(result){
     res.status(201).json({message:"comment created",data:result})
 })
 .catch(function(e){
     res.status(500).json({abc:e})
 })
 })
 router.get("/location/all",function(req,res){
    Location.find().then(function(data){
        res.status(200).json(data);
    }).catch(function(er){
        res.status(500).json({error:er})
    })
})
//update
module.exports=router;