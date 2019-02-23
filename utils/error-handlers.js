/* eslint-disable no-throw-literal,no-param-reassign */

const excludeErrorFields = /id|slug|token/;

const catchNoContentUpdateError = (update, res, next) => {
  if (Object.keys(update).length === 0) {
    res.status(422).json({ error: { message: 'Request would not update any resources.' } });
  } else {
    next();
  }
};

const catchResourceNotFoundError = (context) => {
  const { resource, modelName } = context;
  if (!resource) {
    throw {
      status: 404,
      message: `${modelName} not found.`,
      noLog: true,
    };
  }
  return resource;
};

const handleValidationError = (errors, res) => {
  const errorArray = [];
  Object.keys(errors).forEach((key) => {
    if (!excludeErrorFields.test(key)) {
      const error = errors[key];
      errorArray.push({ path: key, message: error.message });
    }
  });
  res.status(422).json({ errors: errorArray });
};

const handleCastObjectIdError = (error, res, next) => {
  if (error.kind !== 'ObjectId') return next();
  if (error.path === '_id') {
    res.status(404).json({ error: { message: `${error.model.modelName} not found.` } });
  } else {
    res.status(422).json({ error: { message: 'Invalid ID value.' } });
  }
};

const handleJWTError = (err, res, next) => {
  const { message } = err;
  const dotIndex = message.indexOf('.');
  if (dotIndex >= 0) err.message = message.substring(0, dotIndex);
  next(err);
};

module.exports = {
  catchNoContentUpdateError,
  catchResourceNotFoundError,
  handleValidationError,
  handleCastObjectIdError,
  handleJWTError,
};
