const mongoose = require('mongoose')

commentSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email:String,
    commentText:String,
    blogId :String,
    timestamp:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Comment',commentSchema)