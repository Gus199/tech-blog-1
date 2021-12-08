const { Post } = require("../models");

const postdata = [
  {
    title: "OOP",
    contents:
      "I learned a lot about object oriented programming this week, it's complicated!",
    user_id: 1,
  },
  {
    title: "Cryptocurrency",
    contents:
      "I learned about bitcoin and ethereum 10 years ago, I wish I acted on it...",
    user_id: 1,
  },
  {
    title: "Artificial Intelligence",
    contents:
      "I have seen a lot about Facebook/Meta developing AI.  What do you guys think, will the AI robots take over the world?",
    user_id: 1,
  },
  {
    title: "Video Games",
    contents: "Have you guys played the new Fortnite Chapter 3?  It's fun!",
    user_id: 2,
  },
  {
    title: "Macbook Pro",
    contents:
      "Does anyone use a macbook pro for web development?  How do the specs hold up vs. other pcs?",
    user_id: 3,
  },
  {
    title: "ReactJS",
    contents:
      "I can't wait to start learning about React.  I've had a little experience putting together React apps and they are so robust!",
    user_id: 3,
  },
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
