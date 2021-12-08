const postRoutes = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// create new post
postRoutes.post("/", withAuth, async (req, res) => {
  Post.create({
    ...req.body,
    user_id: req.session.user_id,
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// delete post by id
postRoutes.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update post by id
postRoutes.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedPostData = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    res.status(200).json(updatedPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new comment
postRoutes.post("/:id/comments/", withAuth, async (req, res) => {
  Comment.create({
    ...req.body,
    post_id: req.params.id,
    user_id: req.session.user_id,
  })
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = postRoutes;
