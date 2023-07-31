const Joi = require("joi");


const defaultOtpValidityInMinutes = 10;

const passwordsConfigProperties = {
  otpValidityInMinutes: +process.env.OTP_VALIDITY_MINS || defaultOtpValidityInMinutes,
};

const passwordsConfigPropertiesSchema = Joi.object({
  otpValidityInMinutes: Joi.number().required(),
});


try {
  Joi.assert(
    passwordsConfigProperties,
    passwordsConfigPropertiesSchema
  );
} catch (validationError) {
  console.error(
    "Failed to validate the passwords configuration properties. Check your app configuration"
  );

  throw validationError;
}


module.exports = {
  passwordsConfigProperties,
};
