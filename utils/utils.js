const bcrypt = require('bcrypt');

const utils = {
  hashPassword: (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  },
};

module.exports = utils;
