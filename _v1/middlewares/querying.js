const { replaceAll } = require('../../utils/string');

exports.parseProjection = (req, res, next) => {
    const { fields } = req.query;
    if (fields) req.projection = replaceAll(fields, ',', ' ');
    next();
};

exports.parsePagination = (req, res, next) => {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);

    req.page = (!page || page <= 0) ? 1 : page;
    req.size = (!size || size <= 0) ? 10 : size;

    next();
};

exports.parseSort = (req, res, next) => {
    const { sort } = req.query;
    if (sort) req.sort = replaceAll(sort, ',', ' ');
    next();
};
