const postRoutes = require("express").Router();
const { Post, User, Comment } = require("../../models");

// create new post
// TODO: add auth middleware
postRoutes.post("/", async (req, res) => {
  Post.create({
    ...req.body,
    // TODO: change user_id to come from req.session.user_id
    // user_id: req.session.user_id,
    user_id: 2,
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// delete post by id
// TODO: add auth middleware
postRoutes.delete("/:id", async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        // TODO: uncomment below line once sessions are setup
        // user_id: req.session.user_id,
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
// TODO: add auth middleware
postRoutes.put("/:id", async (req, res) => {
  try {
    const updatedPostData = await Post.update(req.body, {
      where: {
        id: req.params.id,
        // TODO: uncomment below line once sessions are setup
        // user_id: req.session.user_id
      },
    });
    res.status(200).json(updatedPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new comment
postRoutes.post("/:id/comments/", async (req, res) => {
  Comment.create({
    ...req.body,
    post_id: JSON.parse(req.params.id),
    // TODO: change user_id to come from req.session.user_id
    // user_id: req.session.user_id,
    user_id: 2,
  })
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = postRoutes;
