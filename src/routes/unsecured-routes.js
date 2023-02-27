const unsecuredRoutesPatterns = ["/auth/token"].map(
  (pattern) => new RegExp(pattern)
);


module.exports = unsecuredRoutesPatterns;
