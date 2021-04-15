const mongoose=require('mongoose');

const Information=mongoose.model('Information',{
    name:{
        type:String

    },
    age:{
        type:String
    },
    address:{
        type:String
    },
    gender:{
        type:String
    },

    image:{
        type:String
    }

})


module.exports=Information;