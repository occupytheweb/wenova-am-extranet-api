const errors = require("../utils/errors");

module.exports = async (ctx, next) => {
  try {
    await next();

  } catch (err) {
    if (!!err.isJoi) {
      const errorDetails = errors.wellKnownErrors.badRequest;

      ctx.status = errorDetails.statusCode;
      ctx.body = {
        ...errorDetails,
        details: err.details,
      };

    } else if (
      !!err.message
      && errors.isWellKnownErrorMessage(err.message)
    ) {
      const errorDetails = errors.getErrorDetailsByMessage(err.message);

      ctx.status = errorDetails.statusCode;
      ctx.body = errorDetails;

    } else {
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = {
        statusCode: ctx.status,
        message: err.message,
      };
    }
  }
};
