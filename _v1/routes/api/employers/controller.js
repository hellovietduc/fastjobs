const Employer = require('../../../models/account-employer');

exports.getEmployerById = (id, projection) => {
    return Employer.findById(id)
        .select(projection)
        .exec();
};

exports.getEmployers = (conditions, page, size, projection, sort) => {
    return Employer.find(conditions)
        .select(projection)
        .limit(size)
        .skip((page - 1) * size)
        .sort(sort)
        .exec();
};
