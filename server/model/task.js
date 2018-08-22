const mongoose = require('mongoose');

//schema allows mongoose to make new objects in mongodb
const schema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    completed:{
        type: Boolean,
        default: false
    },
    canEdit: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Task', schema);