const fs = require("fs");
const users = []

// ! Join user to chat:
function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

// ! Get current user:
function getCurrentUsers(id) {
  return users.find((user) => user.id == id);
}

module.exports = {
  userJoin,
  getCurrentUsers,
};
