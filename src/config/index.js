const Joi = require("joi");

const defaults = {
  port: 4000,
  maxItemsPerPage: 50,
};

const port = process.env.PORT || defaults.port;
const maxItemsPerPage =
  process.env.MAX_ITEMS_PER_PAGE || defaults.maxItemsPerPage;

const encodedJwtSigningKeyCandidate = process.env.ENCODED_JWT_SIGNING_KEY;
const encodedJwtSigningKey = Joi.attempt(
  encodedJwtSigningKeyCandidate,
  Joi.string()
    .base64()
    .required()
    .error((errors) =>
      errors
        .map((err) => {
          err.message = `Invalid JWT sining key: '${encodedJwtSigningKeyCandidate}'`;
        })
        .find((err) => !!err.message)
    )
);

module.exports = {
  port,
  maxItemsPerPage,
  encodedJwtSigningKey,
};
