const { DateTime } = require("luxon");
const crypto = require("crypto");
const { passwordsConfigProperties } = require("../config");
const mailer = require("./mailer.service");
const userRepository = require("../repositories/users.repository");


const generateAndStoreOtpDetailsForUser = async (
  email
) => {
  console.debug(`[FORGOT-PASSWORD] Generating OTP details for yuser '${email}'...`);

  const otpLength = 8;
  const otp       = crypto
    .randomBytes(otpLength)
    .toString("hex")
  ;
  const validUntil = DateTime.now()
    .plus({
      minutes: 10,
    })
  ;

  await userRepository.findByEmail(email).then(
    (user) => userRepository.saveOtpDetails(
      user.id,
      otp,
      validUntil.toJSDate()
    )
  );
  console.debug(`[FORGOT-PASSWORD] OTP details saved for user '${email}'.`);

  return {
    otp,
    validUntil,
  };
};


const generateForgotPasswordLink = (
  email,
  otpDetails
) => {
  const { otp } = otpDetails;

  const queryString = `email=${email}&otp=${otp}`;
  const encodedId   = Buffer
    .from(
      encodeURIComponent(queryString)
    )
    .toString("base64")
  ;

  return `https://partenaires.wenova-am.com/forgot-password.html?id=${encodedId}`;
};


const generateForgotPasswordEmailMarkup = (
  email,
  otpDetails
) => {
  const forgotPasswordLink = generateForgotPasswordLink(email, otpDetails);
  const { otpValidityInMinutes } = passwordsConfigProperties;

  return `Lien de réinitialisation: ${forgotPasswordLink}.
  Ce lien sera valide pendant ${otpValidityInMinutes} minutes.
  `;
};


const sendForgotPasswordEmail = async (
  email,
  markup
) => {
  console.debug(`[FORGOT-PASSWORD] sending mail to user '${email}'...`);

  return mailer.sendMail(
    email,
    "Réinitialisez votre mot de passe",
    markup
  );
};


const launchForgotPasswordProcessForUser = async (
  email
) => new Promise(
  (resolve) => {
    console.log(`[FORGOT-PASSWORD] launching process for user '${email}'...`);
    resolve();
  }
).then(
  () => generateAndStoreOtpDetailsForUser(email)
)
  .then(
    (otpDetails) => generateForgotPasswordEmailMarkup(
      email,
      otpDetails
    )
  )
  .then(
    (markup) => sendForgotPasswordEmail(
      email,
      markup
    )
  )
  .then(
    (result) => {
      console.log(`[FORGOT-PASSWORD] process completed for user '${email}'`);

      return result;
    }
  );


module.exports = {
  launchForgotPasswordProcessForUser,
};
