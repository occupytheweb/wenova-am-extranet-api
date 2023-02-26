const Router = require("@koa/router");

const subscriptions = require("../../resources/subscriptions.resource");
const validators = require("./subscriptions.validators");
const pagination = require("../../utils/pagination");

const authService = require("../../services/auth.service");

const router = new Router({
  prefix: "/subscriptions",
});

router.get("/", (ctx) => {
  const { userId: distributorId } =
    authService.getUserFromAuthenticatedRequest(ctx);

  const criteria = validators.validateAndGetSearchCriteria(ctx);
  const { page, maxPerPage } = pagination.getPaginationParams(ctx);

  ctx.body = subscriptions.search(distributorId, criteria, page, maxPerPage);
});

module.exports = router;
