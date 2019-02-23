exports.parseConditions = (req, res, next) => {
    const conditions = new Map();
    conditions.set('industries',                   req.query.industry);
    conditions.set('location.work_locations',      req.query.location);
    conditions.set('qualification.academic_level', req.query.academic_level);
    conditions.set('desire.position',              req.query.position);
    conditions.set('work_experience.in_years',     req.query.experience);
    conditions.set('foreign_languages',            req.query.foreign_language);
    conditions.set('gender',                       req.query.gender);
    conditions.set('desire.salary',                req.query.salary);
    conditions.set('location.city',                req.query.city);

    if (req.query.age) {
        const age = req.query.age;
        const year = new Date().getFullYear();
        const start = new Date(year - age, 0, 1);
        const end = new Date(year - age + 1, 0, 1);
        conditions.set('date_of_birth', { $gte: start, $lt: end });
    }

    if (req.query.skills) {
        const skills = req.query.skills.split(',');
        conditions.set('skills.list', { $all: skills });
    }

    req.conditions = Array.from(conditions)
        .filter(e => !!e[1])
        .reduce((previous, current) => {
            return { ...previous, [current[0]]: current[1] }
        }, {});

    next();
};
