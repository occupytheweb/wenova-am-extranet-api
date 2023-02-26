module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (!!err.isJoi) {
      const message = err.details.map((detail) => detail.message).join("\n");

      ctx.status = 400;
      ctx.body = {
        statusCode: ctx.status,
        error: "Bad request",
        errorType: "validation",
        message,
      };
    } else {
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = {
        statusCode: ctx.status,
        message: err.message,
      };
    }
  }
};
