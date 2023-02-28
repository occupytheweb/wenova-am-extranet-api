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


module.exports = {
  getValidatedCredentialsPayload,
};
