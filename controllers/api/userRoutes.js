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

// sign up route
// WORKING
// TODO: error handling
userRoutes.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// login route
// TODO: how to send message to user on failure (incorrect username, incorrect password, etc.)
userRoutes.post("/login", async (req, res) => {
  const response = { message: "incorrect username bro" };
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      return res
        .status(400)
        .send(
          JSON.stringify({ message: `The user with email doesn't exist.` })
        );
      // res.status(500).json(response);
      // return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(500).json({ message: "Incorrect password, please try again" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// WORKING
// logout user
userRoutes.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = userRoutes;
