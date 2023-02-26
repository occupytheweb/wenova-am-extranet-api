const Joi = require("joi");

const config = require("../config");

const getPaginationParams = (ctx) => {
  const potentialPage = ctx.request.query.page || 1;
  const potentialMaxPerPage =
    ctx.request.query.maxPerPage || config.maxItemsPerPage;

  const { err: pageError, value: page } = Joi.number()
    .min(1)
    .validate(potentialPage);
  const { err: maxPerPageError, value: maxPerPage } = Joi.number()
    .min(1)
    .validate(potentialMaxPerPage);

  const effectivePage = !pageError ? page : 1;
  const effectiveMaxPerPage = !maxPerPageError
    ? maxPerPage
    : config.maxItemsPerPage;

  return {
    page: effectivePage,
    maxPerPage: effectiveMaxPerPage,
  };
};

module.exports = {
  getPaginationParams,
};
