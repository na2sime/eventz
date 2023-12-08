const Jimp = require("jimp"); // Package qui permet de redimensionner les images

/**
 * Middleware function to resize an image file.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {function} next - The Next function to pass control to the next middleware function.
 *
 * @returns {void}
 */
const resizeImageMiddleware = async (req, res, next) => {
    if (!req.file) {
        return next();
    }

    const imagePath = req.file.path;

    try {
        const image = await Jimp.read(imagePath);
        await image
            .resize(Jimp.AUTO, 720) // Redimensionner l'image en 700px de hauteur et conserver le ratio
            .quality(90) // Ajuster la qualité de l'image JPG (0-100)
            .contain(1280, Jimp.AUTO) // Redimensionner l'image en 500px de largeur et conserver le ratio
            .writeAsync(imagePath); // Écrire l'image redimensionnée en écrasant l'ancienne image

        console.log(
            "Image convertie en format JPG et redimenssionnée"
        );
        next();
    } catch (error) {
        console.log("Une erreur est survenue lors du traitement de l'image !");
        console.error(error);
        res.status(500).json({
            error: "Une erreur est survenue lors du traitement de l'image",
        });
    }
};

module.exports = resizeImageMiddleware;