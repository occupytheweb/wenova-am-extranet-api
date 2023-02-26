const Joi = require("joi");

const validateAndGetSearchCriteria = (ctx) => {
  const potentialProduct = ctx.request.query.product;
  const { err, value } = Joi.string().required().validate(potentialProduct);

  return {
    ...(!err ? { product: value } : {}),
  };
};

module.exports = {
  validateAndGetSearchCriteria,
};
