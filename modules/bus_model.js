const mongoose=require('mongoose');

const bus=mongoose.model('bus',{
    fname:{
        type:String

    },
    lname:{
        type:String
    },
    email:{
        type:String
    },
    phoneno:{
        type:String
    },

    password:{
        type:String
    }

})


module.exports=bus;