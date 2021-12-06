const { User } = require("../models");

const userdata = [
  {
    username: "user1",
    password: "abc123",
  },
  {
    username: "user2",
    password: "abc123",
  },
  {
    username: "user3",
    password: "abc123",
  },
];

const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;
