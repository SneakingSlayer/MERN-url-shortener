const mongoose = require('mongoose');

const tempUrlSchema = new mongoose.Schema({
    original_url:{
        type:String,
        required: true
    },
    shortened_url:{
        type:String,
        required: true
    },
    date_created:{
        type:Date,
        required: true
    },
    expiresIn:{
        type:Date,
        required: true
    }
});

module.exports = mongoose.model('tempURLs', tempUrlSchema);