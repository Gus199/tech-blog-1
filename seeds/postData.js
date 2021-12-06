const { Post } = require("../models");

const postdata = [
  {
    title: "My first post",
    contents: "This is my first post and I love this blog!",
    user_id: 1,
  },
  {
    title: "My second post",
    contents: "This is my second post and I love this blog!",
    user_id: 1,
  },
  {
    title: "My third post",
    contents: "This is my third post and I love this blog!",
    user_id: 1,
  },
  {
    title: "Dogs",
    contents: "This is a blog post about dogs.",
    user_id: 2,
  },
  {
    title: "Cats",
    contents: "This is a blog post about cats.",
    user_id: 3,
  },
  {
    title: "Wolves",
    contents: "This is a blog post about wolves.",
    user_id: 2,
  },
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
