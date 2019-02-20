const { removeVietnameseAccents } = require('../../../utils/string');

const slugifyName = (firstName = '', lastName = '') => {
  const last = lastName.trim().split(' ').map(e => e.charAt(0)).join('');
  const first = firstName.trim().split(' ').join('');
  return removeVietnameseAccents(`${last}${first}`).toLowerCase();
};

module.exports = {
  slugifyName,
};
