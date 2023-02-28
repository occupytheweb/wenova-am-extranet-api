const userRepository = require("../repositories/users.repository");
const tokenService   = require("./token.service");
const passwords      = require("../utils/passwords");

const { wellKnownErrors } = require("../utils/errors");


const authenticateUser = (user, password) => (!!user
  ? passwords
    .plaintextPasswordMatchesStoredHash(
      password,
      user.hashedPassword
    )
    .then(
      (result) => (!!result
        ? user
        : Promise.reject(new Error(wellKnownErrors.invalidCredentials.title)))
    )
  : Promise.reject(new Error(wellKnownErrors.invalidCredentials.title)))
;


const authenticate = (email, password) => userRepository
  .findByEmail(email)
  .then(
    (user) => authenticateUser(user, password)
  )
;


const authenticateAndGetToken = (
  ctx,
  email,
  password
) => authenticate(email, password)
  .then(
    (user) => tokenService.getTokenForUser(ctx, email, user.id)
  )
;


const getUserFromAuthenticatedRequest = (ctx) => {
  const { user } = ctx.state;

  return {
    userId: user.userId,
    email:  user.email,
  };
};


module.exports = {
  authenticateUser,
  authenticate,
  authenticateAndGetToken,
  getUserFromAuthenticatedRequest,
};
