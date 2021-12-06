const userRoutes = require("express").Router();
const { User, Post } = require("../../models");

// get all users for testing
userRoutes.get("/", async (req, res) => {
  try {
    const usersData = await User.findAll();
    if (!usersData) {
      res.json("No users found");
      return;
    }
    res.status(200).json(usersData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single user by id and include any posts
userRoutes.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      // TODO: remove password from data we include from user
      include: [{ model: Post }],
    });
    if (!userData) {
      res.json("Cannot find user");
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = userRoutes;
