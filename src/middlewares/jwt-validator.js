const jwt = require("koa-jwt");

const { jwtSigningKey } = require("../services/token.service");
const unsecuredPathPatterns = require("../routes/unsecured-routes");

module.exports = () =>
  jwt({
    secret: jwtSigningKey,
  }).unless({
    path: unsecuredPathPatterns,
  });
