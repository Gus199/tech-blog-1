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
          attributes: { exclude: ["password"] },
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
      page_title: "Tech Blog",
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
          attributes: { exclude: ["password"] },
        },
        { model: Comment, include: [{ model: User }] },
      ],
    });
    if (!postData) {
      res.json("No post found with that id");
    }
    const post = postData.get({ plain: true });
    console.log(post);

    if (req.session.user_id === post.user_id) {
      res.render("userPost", {
        ...post,
        logged_in: req.session.logged_in,
        page_title: "Update Post",
      });
    } else {
      res.render("post", {
        ...post,
        logged_in: req.session.logged_in,
        page_title: "Tech Blog",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single user by id and include any posts
router.get("/user/:id", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
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
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      logged_in: true,
      page_title: "Your Dashboard",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get login page
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login", {
    page_title: "Login",
  });
});

// Get signup page
router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("signup", {
    page_title: "Sign up",
  });
});

router.get("/posts/add", withAuth, (req, res) => {
  try {
    res.status(200).render("addPostForm", {
      logged_in: req.session.logged_in,
      page_title: "Create Post",
    });
  } catch (err) {
    res.status(500).json("Could not find post form");
  }
});

module.exports = router;
