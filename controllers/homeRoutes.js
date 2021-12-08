const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// get all posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      // TODO: remove password from data we include from user
      include: [
        {
          model: User,
        },
        { model: Comment, include: [{ model: User }] },
      ],
    });
    if (!postData) {
      res.json("Could not find any posts");
    }
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
      dashboard_title: false,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single post by id
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      // TODO: remove password from data we include from user
      include: [
        {
          model: User,
        },
        { model: Comment, include: [{ model: User }] },
      ],
    });
    if (!postData) {
      res.json("No post found with that id");
    }
    const post = postData.get({ plain: true });
    console.log(post);

    res.render("post", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single user by id and include any posts
router.get("/user/:id", async (req, res) => {
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

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
      dashboard_title: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
