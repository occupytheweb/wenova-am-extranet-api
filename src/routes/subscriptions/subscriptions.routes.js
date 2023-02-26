const Router = require("@koa/router");

const subscriptions = require("../../resources/subscriptions.resource");
const validators = require("./subscriptions.validators");
const pagination = require("../../utils/pagination");

const router = new Router({
  prefix: "/subscriptions",
});

router.get("/", (ctx) => {
  const mockDistributorId = 49;

  const criteria = validators.validateAndGetSearchCriteria(ctx);
  const { page, maxPerPage } = pagination.getPaginationParams(ctx);

  ctx.body = subscriptions.search(
    mockDistributorId,
    criteria,
    page,
    maxPerPage
  );
});

module.exports = router;
