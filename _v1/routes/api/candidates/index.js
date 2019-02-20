const express = require('express');
const Controller = require('./controller');
const { parseProjection, parsePagination, parseSort } = require('../../../middlewares/querying');
const { parseConditions } = require('./middlewares');

const router = express.Router();

const getMany = async (req, res, next) => {
    const { conditions, page, size, projection, sort } = req;
    try {
        const candidates = await Controller.getCandidates(conditions, page, size, projection, sort);
        res.status(200).json({
            _total: candidates.length,
            _page: req.page,
            _size: req.size,
            candidates
        });
    } catch (e) {
        next(e);
    }
};

const getOne = async (req, res, next) => {
    try {
        const candidate = await Controller.getCandidateById(req.params.id, req.projection);
        if (candidate) {
            res.status(200).json({ candidate });
        } else {
            res.status(404).json({ candidate: {} });
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

router.get('/', parseProjection, parseConditions, parsePagination, parseSort, getMany);
router.get('/_stats', parseConditions, getStats);
router.get('/:id', parseProjection, getOne);

module.exports = router;
