const Joi = require("joi");

const validateAndGetSearchCriteria = (ctx) => {
  const potentialYear = ctx.request.query.product;
  const { err, value } = Joi.number().required().validate(potentialYear);

  return {
    ...(!err ? { year: value } : {}),
  };
};

module.exports = {
  validateAndGetSearchCriteria,
};
