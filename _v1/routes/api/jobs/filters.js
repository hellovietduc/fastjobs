const { LatLng, computeDistanceBetween } = require('spherical-geometry-js');

exports.byCoordsAndRadius = (coords, radius) => job => {
    try {
        const baseLocation = new LatLng(coords.lat, coords.lng);
        const jobLocation = new LatLng(job.employer._coords.lat, job.employer._coords.lng);
        return computeDistanceBetween(baseLocation, jobLocation) <= radius;
    } catch (e) {
        console.log(e);
        return false;
    }
};
