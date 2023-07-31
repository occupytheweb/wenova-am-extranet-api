const encodedAtSign = encodeURIComponent("@");

const unsecuredRoutesPatterns = [
  "/auth/token",
  "/users/me/password/forgotten",
  `/distributors/.+${encodedAtSign}.+`,
  `/users/.+${encodedAtSign}.+/password/forgotten`,
].map(
  (pattern) => new RegExp(pattern)
);


module.exports = unsecuredRoutesPatterns;
