const Joi = require("joi");


const getValidatedIdFromRequestParamsIfPossible = (ctx) => {
  const potentialId = ctx.params.id;

  Joi.assert(
    potentialId,
    Joi.number().required(),
    "'id' should be a number"
  );

  return +potentialId;
};

const getValidatedEmailFromRequestParamsIfPossible = (ctx) => {
  const potentialEmail = ctx.params.email;

  Joi.assert(
    potentialEmail,
    Joi.string().email().required(),
    "'email' invalid"
  );

  return potentialEmail;
};

const distributorOverviewSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  address: Joi.string().required(),
});

const distributorBillingSchema = Joi.object({
  billingEmail: Joi.string().required(),
  iban: Joi.string().required(),
});

const getValidatedPartialDistributorPayloadIfPossible = (ctx) => {
  const potentialDistributor = ctx.request.body;

  Joi.assert(
    potentialDistributor,
    Joi.alternatives(distributorOverviewSchema, distributorBillingSchema)
  );

  return potentialDistributor;
};


module.exports = {
  getValidatedIdFromRequestParamsIfPossible,
  getValidatedEmailFromRequestParamsIfPossible,
  getValidatedPartialDistributorPayloadIfPossible,
};
