const express = require("express");
const sequelize = require("./config/connection");

const routes = require("./controllers");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.get("/", (req, res) => {
  res.json("Connected to root");
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
