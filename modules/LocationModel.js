const mongoose=require('mongoose');

const Location=mongoose.model('Location',{
    destination:{
        type:String
    },
    from:{
        type:String
    },
    date:{
        type:String
    }
    
})
module.exports=Location;