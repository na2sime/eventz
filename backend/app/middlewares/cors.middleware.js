const cors = require("cors");

const corsOptions = {
    origin: "*",
    allowedHeaders:
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
    methods: "GET, POST, PUT, DELETE, PATCH",
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;