const Joi = require("joi");


const getValidatedCredentialsPayload = (ctx) => {
  const { currentPassword, newPassword } = ctx.request.body;
  const payload = {
    currentPassword,
    newPassword,
  };

  Joi.assert(
    payload,
    Joi.object({
      currentPassword: Joi.string().required(),
      newPassword:     Joi.string().required(),
    })
  );

  return payload;
};


const getValidatedInitialCredentialsPayload = (ctx) => {
  const { initialPassword } = ctx.request.body;
  const payload = {
    initialPassword,
  };

  Joi.assert(
    payload,
    Joi.object({
      initialPassword: Joi.string().required(),
    })
  );

  return payload;
};


const getValidatedForgotPasswordPayload = (ctx) => {
  const { email }          = ctx.request.params;
  const { protocol, host } = ctx.request.body;
  const payload = {
    protocol,
    host,
    email,
  };

  Joi.assert(
    payload,
    Joi.object({
      protocol: Joi.string().required(),
      host:     Joi.string().required(),
      email:    Joi.string().required(),
    })
  );

  return payload;
};
  const payload = {
    email,
  };

  Joi.assert(
    payload,
    Joi.object({
      email: Joi.string().required(),
    })
  );

  return payload;
};


module.exports = {
  getValidatedCredentialsPayload,
  getValidatedInitialCredentialsPayload,
  getValidatedForgotPasswordPayload,
};
