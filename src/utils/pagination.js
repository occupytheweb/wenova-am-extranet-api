const Joi = require("joi");

const config = require("../config");


const getPaginationIndices = (page, maxPerPage) => ({
  startIndex: (page - 1) * maxPerPage,

  get endIndex() {
    return this.startIndex + maxPerPage;
  },
});

const getPaginationParams = (ctx) => {
  const potentialPage = ctx.request.query.page || 1;
  const potentialMaxPerPage = ctx.request.query.maxPerPage || config.maxItemsPerPage;

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

  const { startIndex, endIndex } = getPaginationIndices(
    effectivePage,
    effectiveMaxPerPage
  );

  return {
    page:       effectivePage,
    maxPerPage: effectiveMaxPerPage,
    startIndex,
    endIndex,
  };
};

const getPaginationMetadata = (count, page, maxPerPage) => ({
  page,
  count,
  maxPerPage,
  totalPages: Math.ceil(count / maxPerPage),
});


module.exports = {
  getPaginationParams,
  getPaginationIndices,
  getPaginationMetadata,
};
