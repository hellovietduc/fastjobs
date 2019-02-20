const express = require('express');
const Controller = require('./controller');
const { parseProjection, parsePagination, parseSort } = require('../../../middlewares/querying');
const { parseConditions } = require('./middlewares');

const router = express.Router();

const getMany = async (req, res, next) => {
    const { conditions, page, size, projection, sort } = req;
    try {
        const employers = await Controller.getEmployers(conditions, page, size, projection, sort);
        res.status(200).json({
            _total: employers.length,
            _page: req.page,
            _size: req.size,
            employers
        });
    } catch (e) {
        next(e);
    }
};

const getOne = async (req, res, next) => {
    try {
        const employer = await Controller.getEmployerById(req.params.id, req.projection);
        if (employer) {
            res.status(200).json({ employer });
        } else {
            res.status(404).json({ employer: {} });
        }
    } catch (e) {
        next(e);
    }
};

router.get('/', parseProjection, parseConditions, parsePagination, parseSort, getMany);
router.get('/:id', parseProjection, getOne);

module.exports = router;
