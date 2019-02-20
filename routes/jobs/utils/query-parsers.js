const { removeFalsey } = require('../../../utils/object');

const parseConditions = (query) => {
  const parseSalary = (salary) => {
    if (!salary) return undefined;
    const sal = salary.split('-');
    const low = parseInt(sal[0], 10);
    const high = parseInt(sal[1], 10);
    if (!high) return { 'salary.low': { $gte: low } };
    return { 'salary.low': { $gte: low }, 'salary.high': { $lte: high } };
  };

  return removeFalsey({
    'locations.city': query.location,
    industries: query.industry,
    work_type: query.work_type,
    position: query.position,
    'requirements.experience': query.experience,
    'requirements.gender': query.gender,
    ...parseSalary(query.salary),
  });
};

const parseMapConditions = (query) => {
  const parseCoords = (coords) => {
    if (!coords) return [];
    const coordsArray = coords.split(',');
    const lng = parseFloat(coordsArray[0]);
    const lat = parseFloat(coordsArray[1]);
    return lng && lat ? [lng, lat] : [];
  };

  const parseRadius = (radius) => {
    const rad = parseInt(radius, 10) || 0;
    return (rad <= 0 ? 10 : rad) * 1000;
  };

  return {
    coords: parseCoords(query.coords),
    radius: parseRadius(query.radius),
  };
};

const mapProjection = [
  'slug',
  'title',
  'locations',
  'salary',
  'deadline',
  'company_id',
  'company_slug',
  'company_name',
  'company_logo',
  'geo_location',
].join(' ');

const sortValues = [
  'views', '-views',
  'deadline', '-deadline',
  'salary', '-salary',
  'experience', '-experience',
  'quantity', '-quantity',
  'updated_date', '-updated_date',
];

module.exports = {
  parseConditions,
  parseMapConditions,
  mapProjection,
  sortValues,
};
