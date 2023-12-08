const multer = require("multer");
const path = require("path");

/**
 * Represents the maximum file size in bytes.
 *
 * @type {number}
 */
const maxFileSize = 4 * 1024 * 1024;

/**
 * Represents a variable named `storage` that is an instance of `multer.diskStorage`.
 *
 * @var {multer.diskStorage} storage
 *
 * @description
 * `storage` is used as the storage configuration for multer to handle file uploads.
 *
 * @property {function} destination - A function that determines the destination directory for saving the uploaded files.
 * @property {function} filename - A function that determines the filename for the saved files.
 *
 * @example
 * // Example usage of the `storage` variable
 *
 * const multer = require("multer");
 * const path = require("path");
 *
 * const storage = multer.diskStorage({
 *   destination: (req, file, callback) => {
 *     callback(null, "./media/");
 *   },
 *   filename: (req, file, callback) => {
 *     const name = file.originalname.split(" ").join("_");
 *     const fileNameWithoutExtension = path.parse(name).name;
 *     callback(
 *       null,
 *       fileNameWithoutExtension + "_" + Date.now() + "_resized.jpg"
 *     );
 *   }
 * });
 */
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./media/"); //
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        //const extension = MIME_TYPES[file.mimetype];
        const fileNameWithoutExtension = path.parse(name).name; // Obtention du sans extension
        callback(
            null,
            fileNameWithoutExtension + "_" + Date.now() + "_resized.jpg"
        );
    },
});

/**
 * Applies a filter to determine if a file should be accepted or rejected based on its type.
 *
 * @param {Object} req - The request object.
 * @param {Object} file - The file object to be checked.
 * @param {Function} callback - The callback function to be called after checking the file type.
 * @param {?Error} callback.err - An error object if the file type is not supported.
 * @param {?boolean} callback.accept - A boolean indicating whether the file should be accepted or rejected.
 */
const fileFilter = (req, file, callback) => {
    // Vérifie le type de fichier
    if (file.mimetype.startsWith("image/")) {
        callback(null, true); // Accepte le fichier
    } else {
        console.log(
            "Type de fichier non pris en charge par la serveur :",
            file.mimetype + "!!"
        );
        callback(new Error("Le fichier doit être une image..."), false); // Rejette le fichier
    }
};

module.exports = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: maxFileSize },
}).single("image");