const { replaceCompanyId } = require('../../../utils/slug-replacers');
const log = require('../../../config/log');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next();
  replaceCompanyId(id)
    .then((oid) => {
      req.params.id = oid;
      next();
    })
    .catch((err) => {
      log.error(err);
      next();
    });
};
