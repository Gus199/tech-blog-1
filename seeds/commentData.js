const { Comment } = require("../models");

const commentdata = [
  {
    comment: "my first comment",
    post_id: 1,
    user_id: 1,
  },
  {
    comment: "my second comment",
    post_id: 1,
    user_id: 1,
  },
  {
    comment: "my comment about dogs",
    post_id: 4,
    user_id: 1,
  },
  {
    comment: "comment about cats",
    post_id: 5,
    user_id: 3,
  },
  {
    comment: "comment about wolves",
    post_id: 6,
    user_id: 2,
  },
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;
