module.exports = (req, res, next) => {
  const $set = req.body.$set || {};
  req.body = {
    $set: {
      ...$set,
      user_status: 'unverified',
    },
  };
  next();
};
