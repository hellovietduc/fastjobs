const { mostCommonElementsOf } = require('./array');

exports.countObjects = (objectArray, filter) => {
    return objectArray.filter(filter).length;
};

exports.getMost = (objectArray, propMap) => {
    const values = objectArray.map(propMap);
    return mostCommonElementsOf(values, 1)[0] || null;
};

exports.getTop = (objectArray, propReduce) => {
    const values = objectArray.reduce(propReduce, []);
    return mostCommonElementsOf(values);
};
