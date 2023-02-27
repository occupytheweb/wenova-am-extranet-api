const userRepository = require("../repositories/users.repository");
const tokenService = require("./token.service");

const { wellKnownErrors } = require("../utils/errors");

const authenticate = (email, password) => {
  return userRepository.findByEmail(email).then((user) => {
    if (!!user) {
      return user;
    } else {
      throw new Error(wellKnownErrors.invalidCredentials.title);
    }
  });
};

const authenticateAndGetToken = (ctx, email, password) =>
  authenticate(email, password).then((user) =>
    tokenService.getTokenForUser(ctx, email, user.id_dist)
  );
const getUserFromAuthenticatedRequest = (ctx) => {
  const { user } = ctx.state;

  return {
    userId: user.userId,
    email: user.email,
  };
};

module.exports = {
  authenticateAndGetToken,
  getUserFromAuthenticatedRequest,
};
