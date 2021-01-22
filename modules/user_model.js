const mongoose=require('mongoose');

const User=mongoose.model('User',{
    username:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
        
    },
    password:{
        type:String
    }
})
module.exports=User;