const express=require("express");
const router=express.Router();

const auth=require('../middleware/auth');
const Description=require('../modules/descriptionModel');
const upload=require('../middleware/upload')
router.post('/Description/insert',auth.verifyUser,function(req,res){
   // upload.single('nimage')
    // if(req.file==undefined){
    //     return res.status(400).json({
    //         message:"Invalid file only png and jpg are allowed"
    //     })
    // }
    const ntitle=req.body.title;
    //const image='defaultImage';
    const ndesc=req.body.des;
    const nname=req.body.name;
    console.log(req.body)
    

    console.log(req.body.nimage)
    //console.log(req.body);
    const ndata=new Description({
        title:ntitle,
        //image:image,
        des:ndesc,
        name:nname
    })

ndata.save()
.then(function(result){
    res.status(201).json({message:"description created",bus:result})
})
.catch(function(e){
    res.status(500).json({abc:e})
})
})


router.put("/Description/upload-image/:rid", upload.single('nimage'),async function(req,res){
    console.log('rid',req.params.rid)
    console.log('file',req.file)
    if(req.file!==undefined){
        try {
            const result = await Description.findOneAndUpdate({
                _id:req.params.rid
            },{$set:{image:req.file.filename}})
            res.status(200).json({success:true,bus:result})
        } catch (error) {
            console.log('image upload error: ',error.message)
        }
    } else {
        res.status(500).json({message : "no file found"})
    }
 
})
router.put('/Description/update/:id',function(req,res){
    const title=req.body.title;
    const image=req.body.image;
    const des=req.body.des;
    const name=req.body.name;
    //const id=req.body.id;

    const id = req.params.id;
   console.log(req.body);
    Description.updateOne({_id:id},{title:title,image:image,des:des,name:name})
    
    .then(function(result){
        res.status(200).json({message:"new data has been updated"})
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


router.get("/Description/all",function(req,res){
    Description.find().then(function(data){
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