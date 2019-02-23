const Controller = require('./controller');
const { byCoordsAndRadius } = require('./filters');

const defaultProjection = 'title salary.min salary.max closing_date locations employer';

exports.parseConditions = (req, res, next) => {
    const conditions = new Map();
    conditions.set('industries',              req.query['industry']);
    conditions.set('locations',               req.query['location']);
    conditions.set('work_type',               req.query['work_type']);
    conditions.set('position',                req.query['position']);
    conditions.set('salary.max',              req.query['salary.max']);
    conditions.set('salary.min',              req.query['salary.min']);
    conditions.set('requirements.experience', req.query['experience']);
    conditions.set('requirements.gender',     req.query['gender']);

    req.conditions = Array.from(conditions)
        .filter(e => !!e[1])
        .reduce((previous, current) => {
            return { ...previous, [current[0]]: current[1] }
        }, {});

    next();
};

exports.parseMapQuery = (req, res, next) => {
    const { coords } = req.query;
    if (coords) {
        const coordsArray = coords.split(',');
        if (coordsArray.length === 2) {
            const lat = parseFloat(coordsArray[0]);
            const lng = parseFloat(coordsArray[1]);
            if (lat && lng) {
                const radius = parseInt(req.query.radius);
                req.coords = { lat, lng };
                req.radius = ((!radius || radius <= 0) ? 10 : radius) * 1000;
            }
        }
    }
    next();
};

exports.handleMapRequest = async (req, res, next) => {
    const { coords, radius, query } = req;
    if (coords && radius) {
        const projection = `${defaultProjection} ${req.projection || ''}`;
        const conditions = {};
        if (query['salary.max']) conditions['salary.max'] = query['salary.max'];
        if (query['salary.min']) conditions['salary.min'] = query['salary.min'];
        if (query['industry']) conditions['industries'] = query['industry'];

        const jobs = await Controller.getJobs(conditions, 0, 0, projection);
        const results = jobs.filter(byCoordsAndRadius(coords, radius));
        return res.status(200).json({
            _total: results.length,
            jobs: results
        });
    }
    next();
};
