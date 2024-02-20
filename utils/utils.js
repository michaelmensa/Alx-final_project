const bcrypt = require('bcrypt');

/**
 * hashPassword:
 * hashes password
 *
 * check password
 * checks password validity
 */
const utils = {
  hashPassword: (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  },

  checkPassword: (password, hash) => bcrypt.compareSync(password, hash),
};

module.exports = utils;
