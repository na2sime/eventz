const express = require("express");
const bodyParser = require("body-parser"); //Package gére à analyser data dans corps des requêtes
const path = require("path"); // Package qui gère le chemin des fichier
const app = express();
const connectDatabase = require("./database/mongodb");
const corsMiddleware = require("./middlewares/cors.middleware");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

connectDatabase().then(r => console.log(r));

//Custom le Headers des requêtes!
app.use(corsMiddleware);

app.use(bodyParser.json());

//Récuperer la data encodée sous forme URL
app.use(bodyParser.urlencoded({extended: true}));

//ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

module.exports = app;