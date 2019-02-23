const { removeFalsey } = require('../../../utils/object');

const parseConditions = (query) => {
  const parseExperience = (experience) => {
    if (!experience) return undefined;
    const exp = parseInt(experience, 10);
    if (!exp) return { $lt: 1 };
    if (exp === 5) return { $gte: 5 };
    return exp;
  };

  const parseSalary = (salary) => {
    if (!salary) return undefined;
    const sal = salary.split('-');
    const low = parseInt(sal[0], 10);
    const high = parseInt(sal[1], 10);
    if (!high) return { 'salary.low': { $gte: low } };
    return { 'salary.low': { $gte: low }, 'salary.high': { $lte: high } };
  };

  return removeFalsey({
    work_locations: query.location,
    industries: query.industry,
    academic_level: query.academic_level,
    experience: parseExperience(query.experience),
    position: query.position,
    foreign_langugages: query.foreign_language,
    gender: query.gender,
    ...parseSalary(query.salary),
  });
};

const sortValues = [
  'views', '-views',
  'experience', '-experience',
  'date_of_birth', '-date_of_birth',
  'updated_date', '-updated_date',
];

module.exports = {
  parseConditions,
  sortValues,
};
