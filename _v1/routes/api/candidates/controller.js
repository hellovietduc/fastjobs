const Candidate = require('../../../models/account-candidate');
const { countObjects, getMost, getTop } = require('../../../utils/stats');

const statsProjection = {
    'gender': 1,
    'date_of_birth': 1,
    'work_experience.in_years': 1,
    'industries': 1,
    'skills.list': 1,
    'desire': 1
};

const getCandidateById = (id, projection) => {
    return Candidate.findById(id)
        .select(projection)
        .exec();
};

const getCandidates = (conditions, page, size, projection, sort) => {
    return Candidate.find(conditions)
        .select(projection)
        .limit(size)
        .skip((page - 1) * size)
        .sort(sort)
        .exec();
};

const getStats = async (conditions) => {
    const candidates = await getCandidates(conditions, 0, 0, statsProjection);
    const thisYear = new Date().getFullYear();

    const total_candidates  = candidates.length;
    const total_males       = countObjects(candidates, c => c.gender === 'Nam');
    const total_females     = total_candidates - total_males;
    const male_female_ratio = total_males + '/' + total_females;

    const average_age           = getMost(candidates, c => thisYear - c.date_of_birth.getFullYear());
    const average_experience    = getMost(candidates, c => c.work_experience.in_years);
    const most_desired_position = getMost(candidates, c => c.desire.position);
    const most_desired_salary   = getMost(candidates, c => c.desire.salary);

    const top_industries      = getTop(candidates, (p, c) => [...p, ...c.industries]);
    const top_skills          = getTop(candidates, (p, c) => [...p, ...c.skills.list]);
    const top_desired_benefit = getTop(candidates, (p, c) => [...p, ...c.desire.benefit]);

    return {
        total_candidates,
        male_female_ratio,
        average_age,
        average_experience,
        top_industries,
        top_skills,
        top_desired_benefit,
        most_desired_position,
        most_desired_salary
    };
};

module.exports = {
    getCandidateById,
    getCandidates,
    getStats
};
