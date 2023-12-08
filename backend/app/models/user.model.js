const mongoose = require("mongoose");
const {isEmail} = require("validator"); // check if mail is valid
const uniqueValidator = require("mongoose-unique-validator"); // check if mail is unique

/**
 * Represents a user schema in the database.
 *
 * @typedef {Object} userSchema
 * @property {String} email - The user's email address.
 * @property {String} password - The user's password.
 * @property {String} username - The user's username.
 * @property {String} firstName - The user's first name.
 * @property {String} lastName - The user's last name.
 * @property {Array} events - An array of event IDs that the user is attending.
 * @property {Array} ownEvents - An array of event IDs that the user is hosting.
 *
 * @requires mongoose
 */
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