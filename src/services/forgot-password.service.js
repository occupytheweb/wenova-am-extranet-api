const { DateTime } = require("luxon");
const crypto    = require("crypto");
const {
  passwordsConfigProperties,
} = require("../config");
const mailer         = require("./mailer.service");
const userRepository = require("../repositories/users.repository");
const passwords      = require("../utils/passwords");


const generateAndStoreOtpDetailsForUser = async (
  email
) => {
  console.debug(`[FORGOT-PASSWORD] Generating OTP details for user '${email}'...`);

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
  baseUrl,
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

  return `${baseUrl}/forgot-password.html?id=${encodedId}`;
};


const generateForgotPasswordEmailMarkup = (
  baseUrl,
  email,
  otpDetails
) => {
  const forgotPasswordLink = generateForgotPasswordLink(
    baseUrl,
    email,
    otpDetails
  );
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
  email,
  baseUrl
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
      baseUrl,
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
  )
;


const otpValidityMessageMap = {
  NO_OTP:      "Aucune demande de réinitialisation de mot de passe trouvé pour cet utilisateur",
  OTP_INVALID: "Ce lien de réinitialisation est invalide",
  OTP_EXPIRED: "Ce lien de réinitialisation de mot de passe a expiré",
};


const getOtpValidity = async (
  email,
  otp
) => {
  const validityResponse = (isValid, errorCode) => ({
    isValid,
    message: otpValidityMessageMap[errorCode],
  });

  const currentTime = DateTime.now();
  const user        = await userRepository.findByEmail(email);

  if (!user.otp) {
    return validityResponse(false, "NO_OTP");
  }

  if (user.otp !== otp) {
    return validityResponse(false, "OTP_INVALID");
  }

  const validUntil = DateTime.fromJSDate(
    new Date(
      user.otpValidUntil
    )
  );
  if (currentTime > validUntil) {
    return validityResponse(false, "OTP_EXPIRED");
  }

  return validityResponse(true, "OTP_VALID");
};


const resetForgottenPassword = (
  email,
  newPassword
) => userRepository.findByEmail(email)
  .then(
    (user) => user.id
  )
  .then(
    (userId) => passwords.hashPlaintextPassword(newPassword)
      .then(
        (hashedPassword) => userRepository.updateUserPassword(
          userId,
          hashedPassword
        )
      )
  )
;


module.exports = {
  resetForgottenPassword,
  launchForgotPasswordProcessForUser,
  getOtpValidity,
};
