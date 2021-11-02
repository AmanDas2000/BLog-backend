const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const commentSchema = new mongoose.Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
  timestamps: true
});





module.exports = mongoose.model("Comment", commentSchema);