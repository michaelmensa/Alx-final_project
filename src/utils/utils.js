const bcrypt = require('bcrypt');

/**
 * hashPassword:
 * hashes password
 *
 * check password
 * checks password validity
 * 
 * calculateAge(Date) takes a date argument and returns
 * the current age of the individual
 */
const utils = {
  hashPassword: (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  },

  checkPassword: (password, hash) => bcrypt.compareSync(password, hash),

  calculateAge: (date) => {
    const currentDate = new Date();
    let ageInYears = currentDate.getFullYear() - date.getFullYear();

    // check if birth month has already passed or not
    if (currentDate.getMonth() < date.getMonth() || (currentDate.getMonth() === date.getMonth() && currentDate.getDate() < date.getDate())) {
      return ageInYears - 1;
    }
    return ageInYears;
  },
};

module.exports = utils;
