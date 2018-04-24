const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 25
        },
        description: {
            type: String,
            maxlength: 150
        },
        skills: [{
            type: String,
            maxlength: 100
        }]
    }
);

module.exports = mongoose.model('Mini-Horse', schema);