const Joi = require("joi");

const emailConfigPropertiesCandidate = {
  from:       process.env.EMAIL_FROM,
  clientId:   process.env.EMAIL_SERVICE_ACCOUNT_CLIENT_ID,
  privateKey: process.env.EMAIL_SERVICE_ACCOUNT_PRIVATE_KEY,
};

const emailConfigPropertiesSchema = Joi.object({
  from:       Joi.string().required(),
  clientId:   Joi.string().required(),
  privateKey: Joi.string().required(),
});

try {
  Joi.assert(
    emailConfigPropertiesCandidate,
    emailConfigPropertiesSchema
  );
} catch (validationError) {
  console.error(
    "Failed to validate your email service credentials. Check your app configuration"
  );

  throw validationError;
}


module.exports = {
  emailConnectionProperties: emailConfigPropertiesCandidate,
};
