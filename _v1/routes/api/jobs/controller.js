const Job = require('../../../models/job');
const { getMost, getTop } = require('../../../utils/stats');

const statsProjection = {
    'industries': 1,
    'salary.max': 1,
    'position': 1,
    'benefit.list': 1,
    'requirements.experience': 1,
    'requirements.skills': 1
};

const getJobById = (id, projection) => {
    return Job.findById(id)
        .select(projection)
        .exec();
};

const getJobs = (conditions, page, size, projection, sort) => {
    return Job.find(conditions)
        .select(projection)
        .limit(size)
        .skip((page - 1) * size)
        .sort(sort)
        .exec();
};

const getStats = async (conditions) => {
    const jobs = await getJobs(conditions, 0, 0, statsProjection);

    const total_jobs     = jobs.length;
    const highest_salary = jobs.map(e => e.salary.max).sort((a, b) => b - a)[0] || 0;

    const top_benefit         = getTop(jobs, (p, j) => [...p, ...j.benefit.list]);
    const top_industries      = getTop(jobs, (p, j) => [...p, ...j.industries]);
    const top_positions       = getTop(jobs, (p, j) => [...p, j.position]);
    const top_required_skills = getTop(jobs, (p, j) => [...p, ...j.requirements.skills]);

    const average_required_experience = getMost(jobs, j => j.requirements.experience);

    return {
        total_jobs,
        top_industries,
        top_positions,
        top_benefit,
        highest_salary,
        average_required_experience,
        top_required_skills
    };
};

module.exports = {
    getJobById,
    getJobs,
    getStats
};
