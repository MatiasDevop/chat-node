// here make a model
const mongoose = require('mongoose');

const{ Schema } = mongoose;

const chatSchema = new Schema({
    nick:String,
    msg: String,
    created_at: {
        type: Date,
        default:Date.now
    }
});
module.exports = mongoose.model('Chat', chatSchema);
//this schema already has methods to save to get and so on.
