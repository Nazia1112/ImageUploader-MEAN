const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const item = new Schema({
    filename : {
        type: String,
        required : true
    }
});

module.exports = mongoose.model('nbItems', item);