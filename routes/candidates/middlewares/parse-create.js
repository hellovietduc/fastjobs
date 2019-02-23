const bcrypt = require('bcrypt');
const { removeFalsey } = require('../../../utils/object');
const { parseArray } = require('../../../utils/body-parsers');
const {
  Skill,
  ForeignLanguage,
  Education,
  WorkExperience,
  SocialLink,
} = require('../../../models/child-schemas');
const { slugifyName } = require('../utils/string');

module.exports = async (req, res, next) => {
  const { body } = req;
  const name = body.name || {};
  try {
    req.body = removeFalsey({
      ...body,
      user_status: undefined,
      views: undefined,
      slug: slugifyName(name.first, name.last),
      password: await bcrypt.hash(body.password, 10),
      skills: parseArray(body.skills, Skill.getPaths()),
      foreign_languages: parseArray(body.foreign_languages, ForeignLanguage.getPaths()),
      education: parseArray(body.education, Education.getPaths()),
      work_experience: parseArray(body.work_experience, WorkExperience.getPaths()),
      social_links: parseArray(body.social_links, SocialLink.getPaths()),
    });
    next();
  } catch (err) {
    next(err);
  }
};
