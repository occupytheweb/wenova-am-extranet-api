const nJwt = require("njwt");
const { encodedJwtSigningKey } = require("../config");

const signingKey = Buffer.from(encodedJwtSigningKey);

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

  return nJwt.create(claims, signingKey);
};

module.exports = {
  getTokenForUser,
};
