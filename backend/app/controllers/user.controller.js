const bcrypt = require("bcrypt");
const User = require("../models/user.model");

exports.create = async (req, res) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            password: hash,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            events: [],
            ownEvents: []
        });
        user.save().then(() => {
            res.status(201).json({message: "user created"});
        })
            .catch((error) => {
                res.status(400).json({error});
            });
    }).catch((error) => res.status(500).json({error}));
}

exports.update = async (req, res) => {
    const user = await User.findById(req.params.userId);
    user.email = req.body.email;
    user.username = req.body.username;
    user.password = req.body.password;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.events = req.body.events;
    user.ownEvents = req.body.ownEvents;
    user.save()
        .then(() => res.status(200).json({message: "user updated"}))
        .catch((error) => res.status(400).json({error}));
    res.send(user);
}

exports.findOne = async (req, res) => {
    await User.findById(req.params.userId).then((user) => res.status(200).json(user))
        .catch((error) => res.status(400).json({error}));
}

exports.findByUsername = async (req, res) => {
    await User.findOne({username: req.params.username}).then((user) => res.status(200).json(user))
        .catch((error) => res.status(400).json({error}));
}

exports.findAll = async (req, res) => {
    await User.find().then((users) => res.status(200).json(users))
        .catch((error) => res.status(400).json({error}));
}

exports.delete = async (req, res) => {
    await User.findByIdAndDelete(req.params.userId).then(() => res.status(200).json({message: "user deleted"}))
        .catch((error) => res.status(400).json({error}));
}