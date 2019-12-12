const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    image: { type: String, default: "https://cdn4.iconfinder.com/data/icons/man-and-woman/154/man-human-person-login-512.png"}
});

const User = mongoose.model('User', userSchema);

module.exports = User;