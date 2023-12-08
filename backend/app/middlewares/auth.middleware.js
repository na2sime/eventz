const jwt = require("jsonwebtoken"); // Package qui permet de créer et vérifier les tokens d'authentification

/**
 * Middleware function to handle authentication. Verifies the token in the authorization header and attaches the userId to the request object.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function to be called
 * @returns {void}
 */
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId,
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};