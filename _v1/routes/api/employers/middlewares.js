exports.parseConditions = (req, res, next) => {
    const conditions = new Map();
    conditions.set('company_info.city', req.query.location);
    conditions.set('company_info.size', req.query.company_size);

    req.conditions = Array.from(conditions)
        .filter(e => !!e[1])
        .reduce((previous, current) => {
            return { ...previous, [current[0]]: current[1] }
        }, {});

    next();
};
