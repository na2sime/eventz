const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const createNewUser = (passwordHash, req) => new User({
    email: req.body.email,
    username: req.body.username,
    password: passwordHash,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    events: [],
    ownEvents: []
});

/**
 * Creates a new user instance.
 *
 * @param {Object} req - The request object from user.
 * @param {Object} res - The response object to user.
 * @returns {Object} The status of user creation.
 */
exports.createUserInstance = async (req, res) => {
    try {
        const passwordHash = await bcrypt.hash(req.body.password, 10);
        const user = createNewUser(passwordHash, req);

        await user.save();
        res.status(201).json({message: "User created successfully."});
    } catch (error) {
        res.status(500).json({error});
    }
};

function updateUserDataFromRequestBody(user, reqBody) {
    user.email = reqBody.email;
    user.username = reqBody.username;
    user.password = reqBody.password;
    user.firstName = reqBody.firstName;
    user.lastName = reqBody.lastName;
    user.events = reqBody.events;
    user.ownEvents = reqBody.ownEvents;
}

/**
 * Updates the given object with the provided data.
 *
 * @param {object} object - The object to be updated.
 * @param {object} data - The data to update the object with.
 * @returns {object} - The updated object.
 */
exports.update = async (req, res) => {
    const user = await User.findById(req.body.userId);
    updateUserDataFromRequestBody(user, req.body);
    user.save()
        .then(() => res.status(200).json({message: "user updated"}))
        .catch((error) => res.status(400).json({error}));
    res.send(user);
}

/**
 * Retrieves a user by their id from the database.
 * @param {string} id - The id of the user to retrieve.
 * @returns {Promise} - A promise that resolves with the user object if found,
 *                      otherwise rejects with an error.
 */
exports.findOne = async (req, res) => {
    await User.findById(req.params.id).then((user) => res.status(200).json(user))
        .catch((error) => res.status(400).json({error}));
}

/**
 * Retrieves a user by their username from the database.
 * @param {string} username - The username of the user to retrieve.
 * @returns {Promise} - A promise that resolves with the user object if found,
 *                      otherwise rejects with an error.
 */
exports.findByUsername = async (req, res) => {
    await User.findOne({username: req.body.username}).then((user) => res.status(200).json(user))
        .catch((error) => res.status(400).json({error}));
}

/**
 * Finds all records in the database.
 *
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of records.
 */
exports.findAll = async (req, res) => {
    await User.find().then((users) => res.status(200).json(users))
        .catch((error) => res.status(400).json({error}));
}

/**
 * Deletes an item from the system.
 *
 * @param {string} itemId - The unique identifier of the item to delete.
 * @returns {Promise<boolean>} - A promise that resolves to true if the item was successfully deleted, and false otherwise.
 * @throws {Error} - If there is an error while deleting the item.
 * @example
 * // Usage:
 * const deleted = await deleteItem("12345");
 * if (deleted) {
 *   console.log("Item deleted successfully");
 * } else {
 *   console.log("Failed to delete item");
 * }
 */
exports.delete = async (req, res) => {
    await User.findByIdAndDelete(req.body.userId).then(() => res.status(200).json({message: "user deleted"}))
        .catch((error) => res.status(400).json({error}));
}