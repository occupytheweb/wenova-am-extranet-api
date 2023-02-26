const Joi = require("joi");

const encodedJwtSigningKeyCandidate = process.env.ENCODED_JWT_SIGNING_KEY;

try {
  Joi.assert(encodedJwtSigningKeyCandidate, Joi.string().base64().required());
} catch (validationError) {
  console.error("Failed to validate the supplied encoded JWT signing key.");
  console.error("Check your app configuration");

  throw validationError;
}

module.exports = {
  encodedJwtSigningKey: encodedJwtSigningKeyCandidate,
};
