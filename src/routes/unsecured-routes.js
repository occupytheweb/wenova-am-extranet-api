const encodedAtSign = encodeURIComponent("@");

const routesWithAtSign = [
  `/distributors/.+@.+`,
  `/users/.+@.+/password/forgotten`,
].flatMap(
  (pattern) => [
    pattern,
    pattern.replace("@", encodedAtSign),
  ]
);

const unsecuredRoutesPatterns = [
  "/auth/token",
  "/users/me/password/forgotten",
  ...routesWithAtSign,
].map(
  (pattern) => new RegExp(pattern)
);


module.exports = unsecuredRoutesPatterns;
