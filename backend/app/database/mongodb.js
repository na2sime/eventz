const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        await mongoose.connect(
            process.env.MONGODB_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("Connexion à la base de donnée réussie !");
    } catch (err) {
        console.log(
            "Connexion à la base de donnée échouée ! (" + err + ")"
        );
    }
};

module.exports = connectDatabase;