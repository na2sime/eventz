const fs = require('fs');
const Event = require('../models/event.model');

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.createEvent = async (req, res) => {
    const eventObject = JSON.parse(req.body.event);
    delete eventObject._id;
    delete eventObject._userId;
    const event = new Event({
        ...eventObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get("host")}/media/${
            req.file.filename
        }`,
    });
    event.save().then(() => {
        console.log(`New event created: ${bookObject.title}`);
        res.status(201).json({message: "event created"});
    })
        .catch((error) => {
            console.log(error);
            res.status(400).json({error});
        });
}

exports.updateEvent = async (req, res) => {
    const eventObject = req.file ?
        {
            ...JSON.parse(req.body.event),
            imageUrl: `${req.protocol}://${req.get("host")}/media/${
                req.file.filename
            }`,
        } : {...req.body};
    Event.updateOne({_id: req.params.id}, {...eventObject, _id: req.params.id})
        .then(() => res.status(200).json({message: "event updated"}))
        .catch((error) => res.status(400).json({error}));
}

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        const filename = event.imageUrl.split("/media/")[1];
        fs.unlink(`media/${filename}`, () => {
            Event.deleteOne({_id: req.params.id})
                .then(() => res.status(200).json({message: "event deleted"}))
                .catch((error) => res.status(400).json({error}));
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}