import bcrypt from 'bcrypt';

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password; // hashed
    this.feedbacks = [];
  }

  async comparePassword(plainText) {
    return await bcrypt.compare(plainText, this.password);
  }
}

const users = [];

export { User, users };
