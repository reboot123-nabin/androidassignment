const mongoose=require('mongoose');

const Comment=mongoose.model('Comment',{
    rbStars:{
        type:String
    },
    name:{
        type:String
    }
,
    address:{
        type:String
    }
    ,
    comment:{
        type:String
    }
})
module.exports=Comment;