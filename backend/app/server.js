const http = require("http");
const app = require("./app");
const serverController = require("././middlewares/server.middleware");

const port = serverController.normalizePort(process.env.PORT || "4000");
app.set("port", port);

const server = http.createServer(app);


server.on("error", serverController.errorHandler);
server.on("listening", () => {
    const address = server.address();
    const bind = typeof address === "string" ? "pipe " + address : "port " + port;
    console.log("Service en éxécution sur le " + bind);
    console.log("URL: http://localhost:" + port);
});

server.listen(port);