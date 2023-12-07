const mongoose = require("mongoose");

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