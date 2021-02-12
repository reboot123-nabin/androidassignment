const mongoose=require('mongoose');

const Description=mongoose.model("Description",{
    title:{
        type:String
    },
    image:{
        type:String

    },
    desc:{
        type:String
    },
    name:{
        type:String
    }
 
})


module.exports=Description;