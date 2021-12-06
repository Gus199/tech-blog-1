const router = require("express").Router();
const { Post, User, Comment } = require("../models");
// const withAuth = require('../utils/auth');

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
    res.status(200).json(postData);
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
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
