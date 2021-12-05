const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required: true
    },
    url_name:{
        type:String,
        required: true
    },
    original_url:{
        type:String,
        required: true
    },
    shortened_url:{
        type:String,
        required: true
    },
    view_count:{
        type:String,
        required: true
    },
    date_created:{
        type:Date,
        required: true
    }
});

module.exports = mongoose.model('URLs', urlSchema);