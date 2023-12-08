const mongoose = require("mongoose");

/**
 * @typedef {Object} EventSchema
 * @property {string} name - The name of the event.
 * @property {string} imageUrl - The URL of the event's image.
 * @property {string} description - The description of the event.
 * @property {string} location - The location of the event.
 * @property {Date} date - The date of the event.
 * @property {number} maxPlaces - The maximum number of places available for the event.
 * @property {mongoose.Schema.Types.ObjectId} owner - The ObjectId of the user who owns the event.
 * @property {Array.<mongoose.Schema.Types.ObjectId>} members - An array of ObjectIds of users who are members of the event.
 */
const eventSchema = mongoose.Schema({
    name: {type: String, required: true, trim: true, lowercase: true},
    imageUrl: {type: String, required: true},
    description: {type: String, required: true},
    location: {type: String, required: true},
    date: {type: Date, required: true},
    maxPlaces: {type: Number, required: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    members: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
});

module.exports = mongoose.model("Event", eventSchema);