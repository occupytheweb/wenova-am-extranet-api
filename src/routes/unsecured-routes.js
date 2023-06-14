const unsecuredRoutesPatterns = [
  "/auth/token",
  "/users/me/password/forgotten",
].map(
  (pattern) => new RegExp(pattern)
);


module.exports = unsecuredRoutesPatterns;
