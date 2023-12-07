const mongoose = require("mongoose");
const {isEmail} = require("validator"); // check if mail is valid
const uniqueValidator = require("mongoose-unique-validator"); // check if mail is unique

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true, trim: true, lowercase: true, validate: [isEmail]},
    password: {type: String, required: true, trim: true},
    username: {type: String, required: true, unique: true, trim: true, lowercase: true},
    firstName: {type: String, required: true, trim: true, lowercase: true},
    lastName: {type: String, required: true, trim: true, lowercase: true},
    events: [{type: mongoose.Schema.Types.ObjectId, ref: "Event"}],
    ownEvents: [{type: mongoose.Schema.Types.ObjectId, ref: "Event"}]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);