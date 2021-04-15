const express=require("express");
const router=express.Router();

const auth=require('../middleware/auth');
const Information=require('../modules/InformationModel');
const upload=require('../middleware/upload')
router.post('/information/insert',upload.single('nimage'),function(req,res){

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
    const ndata=new Information({
        name:ntitle,
        age:nimage,
        gender:ndesc,
        address:nname,
        image:nimage
    })

ndata.save()
.then(function(result){
    res.status(201).json({message:"information created"})
})
.catch(function(e){
    res.status(500).json({abc:e})
})
})

module.exports=router;