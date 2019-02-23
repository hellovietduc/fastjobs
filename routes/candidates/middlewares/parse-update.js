const { catchNoContentUpdateError } = require('../../../utils/error-handlers');
const { removeFalsey } = require('../../../utils/object');
const { parseArray } = require('../../../utils/body-parsers');
const { slugifyName } = require('../utils/string');

const parseUpdate = (req, res, next) => {
  const { body } = req;
  const name = body.name || {};
  const expectingSalary = body.expecting_salary || {};
  const skills = parseArray(body.skills, ['skill', 'rating']);
  const foreignLanguages = parseArray(body.foreign_languages, ['language', 'rating']);
  const socialLinks = parseArray(body.social_links, ['icon', 'url']);
  req.body = {
    $set: removeFalsey({
      ...body,
      user_status: undefined,
      phone_number: undefined,
      email: undefined,
      password: undefined,
      access_token: undefined,
      views: undefined,
      name: undefined,
      expecting_salary: undefined,
      education: undefined,
      work_experience: undefined,
      'name.first': name.first,
      'name.last': name.last,
      'expecting_salary.low': expectingSalary.low,
      'expecting_salary.high': expectingSalary.high,
      slug: slugifyName(name.first, name.last),
      skills: skills.length > 0 && skills,
      foreign_languages: foreignLanguages.length > 0 && foreignLanguages,
      social_links: socialLinks.length > 0 && socialLinks,
    }),
  };
  catchNoContentUpdateError(req.body.$set, res, next);
};

const parseInsertEducation = (req, res, next) => {
  const { body } = req;
  req.body = {
    $push: {
      education: body,
    },
  };
  next();
};

const parseRemoveEducation = (req, res, next) => {
  const { body } = req;
  const { school_id: schoolId } = req.params;
  if (schoolId) {
    req.body = {
      $pull: {
        education: {
          school_id: schoolId,
        },
      },
    };
  } else {
    req.body = {
      $pull: {
        education: removeFalsey(body),
      },
    };
  }
  next();
};

const parseInsertWorkExperience = (req, res, next) => {
  const { body } = req;
  req.body = {
    $push: {
      work_experience: body,
    },
  };
  next();
};

const parseRemoveWorkExperience = (req, res, next) => {
  const { body } = req;
  const { company_id: companyId } = req.params;
  if (companyId) {
    req.body = {
      $pull: {
        work_experience: {
          company_id: companyId,
        },
      },
    };
  } else {
    req.body = {
      $pull: {
        work_experience: removeFalsey(body),
      },
    };
  }
  next();
};

module.exports = {
  parseUpdate,
  parseInsertEducation,
  parseRemoveEducation,
  parseInsertWorkExperience,
  parseRemoveWorkExperience,
};
