const nJwt = require("njwt");
const { encodedJwtSigningKey } = require("../config");

const jwtSigningKey = Buffer.from(encodedJwtSigningKey);

const resourceServer = "wenova-extranet.api";

const baseClaims = (ctx) => ({
  iss: ctx.request.hostname || ctx.request.host || resourceServer,
  aud: resourceServer,
});

const getTokenForUser = (ctx, email, userId) => {
  const claims = {
    ...baseClaims(ctx),
    sub: `users/${userId}`,
    email,
    userId,
  };

  return nJwt.create(claims, jwtSigningKey);
};

module.exports = {
  jwtSigningKey,
  getTokenForUser,
};
