const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true,
        maxlength: 100,
        trim:true
    },
    summary:{
        type: String,
        required: true,
        maxlength: 500,
        trim:true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, { timestamps: true })


module.exports = mongoose.model('Blog', blogSchema);