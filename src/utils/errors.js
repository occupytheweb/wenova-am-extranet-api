const wellKnownErrors = {
  invalidCredentials: {
    title:      "Invalid credentials",
    statusCode: 401,
    type:       "authentication",
  },
  badRequest: {
    title:      "Bad request",
    statusCode: 400,
    type:       "validation",
  },
};

const isWellKnownErrorMessage = (message) => Object
  .values(wellKnownErrors)
  .some(
    (error) => error.title === message
  )
;

const getErrorDetailsByMessage = (message) => Object
  .values(wellKnownErrors)
  .find(
    (error) => error.title === message
  )
;


module.exports = {
  wellKnownErrors,
  isWellKnownErrorMessage,
  getErrorDetailsByMessage,
};
