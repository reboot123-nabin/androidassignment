const express=require("express");
const router=express.Router();

const auth=require('../middleware/auth');
const Description=require('../modules/descriptionModel');
const upload=require('../middleware/upload')
router.post('/Description/insert',upload.single('nimage'),function(req,res){

    if(req.file==undefined){
        return res.status(400).json({
            message:"Invalid file only png and jpg are allowed"
        })
    }

    
    const ntitle=req.body.title;
    const nimage=req.file.path;
    const ndesc=req.body.desc;
    const nname=req.body.name;
    console.log(req.body)
    //console.log(req.body);
    const ndata=new Description({
        title:ntitle,
        image:nimage,
        desc:ndesc,
        name:nname
    })

ndata.save()
.then(function(result){
    res.status(201).json({message:"description created"})
})
.catch(function(e){
    res.status(500).json({abc:e})
})
})



router.post('/Description/update',function(req,res){
    const title=req.body.title;
    const image=req.body.image;
    const desc=req.body.desc;
    const name=req.body.name;
    const id=req.body.id;
   
    Description.updateOne({_id:id},{title:title,image:image,desc:desc,name:name})
    
    .then(function(result){
        res.status(200).json({status:true})
    })
    .catch(function(e){
       res.status(500).json({error:e}) 
    })
    //console.log(req.body);
   
})


router.delete('/Description/delete/:id',function(req,res){
    const id=req.params.id;
    
    Description.deleteOne({_id:id})
 
   
.then(function(result){
    res.status(201).json({message:"file deleted"})
})
.catch(function(e){
    res.status(500).json({abc:e})
})
})


router.get("Description/all",auth.verifyAdmin,function(req,res){
    Description.find().then(function(data){
        res.status(200).json(data);
    }).catch(function(er){
        res.status(500).json({error:er})
    })
})


router.get("/Description/single/:id",function(req,res){
    const id=req.params.id;
    Description.findOne({_id:id})
    .then(function(data){
        res.status(200).json(data);
    })
    .catch(function(er){
        res.status(500).json({error:er})
    })
})


module.exports=router