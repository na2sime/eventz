const jwt = require("jsonwebtoken"); //Token d'authentification
const {compare} = require("bcrypt");
const User = require("../models/user.model");

/**
 * Logs in the user with provided credentials.
 *
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<boolean>} - A Promise that resolves to true if the login is successful, otherwise false.
 *
 * @throws {Error} - If the username or password is missing or invalid.
 */
exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then((user) => {
            if (!user) {
                return res.status(401).json({message: "user not found"});
            }
            compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({message: "wrong password"});
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({userId: user._id},
                            process.env.JWT_SECRET,
                            {expiresIn: "3h",}),
                    });
                })
                .catch((error) => res.status(500).json({error}));
        })
        .catch((error) => res.status(500).json({error}));
}

/**
 * Disconnects from the server.
 *
 * @returns {void}
 */
exports.disconnect = (req, res, next) => {
    res.status(200).json({message: "user disconnected"});
}

exports.isConnected = (req, res, next) => {
    jwt.verify(req.headers.authorization.split(" ")[1],
        process.env.JWT_SECRET,
        (err, decodedToken) => {
            if (err) {
                return res.status(401).json({message: "unauthorized"});
            }
            res.status(200).json({message: "authorized"});
        });
}