const { Comment } = require("../models");

const commentdata = [
  {
    comment: "I hate OOP!",
    post_id: 1,
    user_id: 1,
  },
  {
    comment: "I think OOP is super useful and is great practice.",
    post_id: 1,
    user_id: 2,
  },
  {
    comment: "I hate the new chapter!",
    post_id: 4,
    user_id: 1,
  },
  {
    comment: "Yes, macbook pros are fine for web development.",
    post_id: 5,
    user_id: 3,
  },
  {
    comment: "I also love React, I think it's my favorite JS framework.",
    post_id: 6,
    user_id: 2,
  },
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;
