const apiRoutes = require("express").Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");

apiRoutes.use("/users", userRoutes);
apiRoutes.use("/posts", postRoutes);

module.exports = apiRoutes;
