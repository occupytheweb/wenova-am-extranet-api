const Joi = require("joi");

const validateAndGetSearchCriteria = (ctx) => {
  const { year } = ctx.request.query;

  Joi.assert(
    year,
    Joi
      .string()
      .min(4)
      .pattern(/[1,2]\d{3}/),
    "'year' is invalid"
  );

  return {
    ...(!!year ? { year } : {}),
  };
};


module.exports = {
  validateAndGetSearchCriteria,
};
