const { User } = require("../models");

const userdata = [
  {
    username: "jeremiah-quill",
    password: "abc123",
  },
  {
    username: "ollie",
    password: "abc123",
  },
  {
    username: "remi",
    password: "abc123",
  },
];

const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;
