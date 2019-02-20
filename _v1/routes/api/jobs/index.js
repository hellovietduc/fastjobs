const express = require('express');
const Controller = require('./controller');
const { parseProjection, parsePagination, parseSort } = require('../../../middlewares/querying');
const { parseConditions, parseMapQuery, handleMapRequest } = require('./middlewares');

const router = express.Router();

const getMany = async (req, res, next) => {
    const { conditions, page, size, projection, sort } = req;
    try {
        const jobs = await Controller.getJobs(conditions, page, size, projection, sort);
        res.status(200).json({
            _total: jobs.length,
            _page: req.page,
            _size: req.size,
            jobs
        });
    } catch (e) {
        next(e);
    }
};

const getOne = async (req, res, next) => {
    try {
        const job = await Controller.getJobById(req.params.id, req.projection);
        if (job) {
            res.status(200).json({ job });
        } else {
            res.status(404).json({ job: {} });
        }
    } catch (e) {
        next(e);
    }
};

const getStats = async (req, res, next) => {
    const { conditions } = req;
    try {
        const stats = await Controller.getStats(conditions);
        res.status(200).json(stats);
    } catch (e) {
        next(e);
    }
};

router.get('/', parseProjection, parseMapQuery, handleMapRequest, parseConditions, parsePagination, parseSort, getMany);
router.get('/_stats', parseConditions, getStats);
router.get('/:id', parseProjection, getOne);

module.exports = router;
