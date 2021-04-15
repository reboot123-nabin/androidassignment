const express=require('express');
const Comment=require('../modules/commentModel');

const router=express.Router();
const auth=require('../middleware/auth');


router.post('/comment/insert',function(req,res){

     const rbStars=req.body.rbStars
     const name=req.body.name;
 
     const address=req.body.address;
     const comment=req.body.comment;
     console.log(req.body)
 
     console.log(req.body.nimage)

     const ndata=new Comment({
         rbStars:rbStars,
      
         comment:comment,
         address:address,
         name:name
     })
     console.log(ndata)
 
 ndata.save()
 .then(function(result){
     res.status(201).json({message:"comment created",comment:result})
 })
 .catch(function(e){
     res.status(500).json({abc:e})
 })
 })

 router.get("/comment/all",function(req,res){
    Comment.find().then(function(data){
        //res.status(200).json(data);
        res.status(200).json({
            success: true,
            data,
          });
        //res.status(200).json({success:true})
    }).catch(function(er){
        res.status(500).json({error:er})
    })
})
 router.get("/comment/single/:id",function(req,res){
    const id=req.params.id;
    Comment.findOne({_id:id})
    .then(function(data){
        res.status(200).json(data);
    })
    .catch(function(er){
        res.status(500).json({error:er})
    })
})
//update
module.exports=router;