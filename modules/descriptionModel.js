const mongoose=require('mongoose');

const Description=mongoose.model("Description",{
    title:{
        type:String
    },
    image:{
        type:String

    },
    des:{
        type:String
    },
    name:{
        type:String
    }
 
})


module.exports=Description;