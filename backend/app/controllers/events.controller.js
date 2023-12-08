const fs = require('fs');
const Event = require('../models/event.model');

/**
 * Retrieves all events from the database.
 *
 * @return {Promise<Array>} - A promise that resolves with an array of events.
 */
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

/**
 * Retrieves an event from the database by its ID.
 *
 * @param {string} eventId - The ID of the event to retrieve.
 * @returns {Object} - The event object retrieved from the database.
 * @throws {Error} - If the event is not found in the database.
 */
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

/**
 * Creates a new event.
 *
 * @param {string} eventName - The name of the event.
 * @param {Date} startDate - The start date and time of the event.
 * @param {Date} endDate - The end date and time of the event.
 * @param {string} location - The location where the event will take place.
 * @param {string} description - The description of the event.
 * @returns {object} - The created event object.
 *
 * @throws {TypeError} - If any of the input parameters are not of the expected type.
 * @throws {Error} - If the end date is before the start date.
 * @throws {Error} - If any of the input parameters are empty or null.
 */
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

/**
 * Updates an event with the given data.
 *
 * @param {string} eventId - The ID of the event to update.
 * @param {object} eventData - The data to update the event with.
 * @param {string} eventData.title - The updated title for the event.
 * @param {string} eventData.description - The updated description for the event.
 * @param {Date} eventData.startDate - The updated start date for the event.
 * @param {Date} eventData.endDate - The updated end date for the event.
 * @param {string} eventData.location - The updated location for the event.
 * @returns {Promise} - A Promise that resolves to the updated event if successful, or rejects with an error if unsuccessful.
 *
 * @throws {Error} - Throws an error if the eventId is not provided or if the eventData is not provided.
 * @throws {TypeError} - Throws a TypeError if any of the expected properties in eventData are not of the correct types.
 *
 * @example
 * updateEvent("1234", {
 *   title: "New Title",
 *   description: "Updated description for the event",
 *   startDate: new Date("2022-01-01"),
 *   endDate: new Date("2022-01-10"),
 *   location: "New Location"
 * }).then((updatedEvent) => {
 *   console.log(updatedEvent);
 * }).catch((error) => {
 *   console.error(error);
 * });
 */
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

/**
 * Deletes a specific event.
 *
 * @param {string} eventId - The unique identifier of the event to be deleted.
 * @returns {boolean} - True if the deletion was successful, false otherwise.
 */
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