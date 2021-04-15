const mongoose=require('mongoose');

const User=mongoose.model('User',{
    username:{
        type:String,
        required:true,
        unique:true
    },
   
    password:{
        type:String,
        required:true
    },

    userType:{
        type:String,
        enum:['Admin','passenger','Driver'],
        default:'passenger'
    }
})
module.exports=User;