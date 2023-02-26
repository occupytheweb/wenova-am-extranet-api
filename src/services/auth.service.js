const userRepository = require("../repositories/users.repository");
const tokenService = require("./token.service");

const authenticate = (email, password) => {
  return new Promise((resolve, reject) => {
    const user = userRepository.findByEmail(email);

    if (!!user) {
      resolve(user);
    } else {
      reject(new Error("Invalid credentials"));
    }
  });
};

const authenticateAndGetToken = async (ctx, email, password) => {
  return authenticate(email, password).then((user) =>
    tokenService.getTokenForUser(ctx, email, user.id_dist)
  );
};

module.exports = {
  authenticateAndGetToken,
};
