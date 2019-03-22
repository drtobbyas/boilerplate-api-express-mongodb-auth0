const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const configDefault = {
  saltRounds: 10,
};

module.exports = class Crypto {
  constructor(config) {
    this._config = config || configDefault;
    this._encoder = bcrypt;
    this._crypto = crypto;
  }

  getRandomString(bytes) {
    return this._crypto.randomBytes(bytes).toString('hex');
  }

  async encode(inputString) {
    if (!inputString) {
      throw ((`${this.name}: string to encode is not provided`).toString());
    }

    return this._encoder.hash(inputString, this._config.saltRounds);
  }

  async verifyPassword(passwordProvided, hashedPassword) {
    return this._encoder.compare(passwordProvided, hashedPassword);
  }
};
