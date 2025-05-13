const bcrypt = require('bcrypt');

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.feedbacks = [];
  }

  async comparePassword(plainText) {
    return await bcrypt.compare(plainText, this.password);
  }
}

const users = [];

module.exports = { User, users };
