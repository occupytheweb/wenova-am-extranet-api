const Joi = require("joi");


const getValidatedCredentialsPayload = (ctx) => {
  const { email, password } = ctx.request.body;

  Joi.assert(
    email,
    Joi.string().email().required(),
    "'email' is invalid"
  );
  Joi.assert(
    password,
    Joi.string().required(),
    "'password' is invalid"
  );

  return {
    email,
    password,
  };
};


module.exports = {
  getValidatedCredentialsPayload,
};
