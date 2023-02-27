const Router = require("@koa/router");

const subscriptions = require("../../resources/subscriptions.resource");
const validators    = require("./subscriptions.validators");
const pagination    = require("../../utils/pagination");
const authService   = require("../../services/auth.service");


const router = new Router({
  prefix: "/subscriptions",
});

router.get("/", async (ctx) => {
  const { userId: distributorId } = authService.getUserFromAuthenticatedRequest(ctx);

  const criteria = validators.validateAndGetSearchCriteria(ctx);
  const { page, maxPerPage } = pagination.getPaginationParams(ctx);

  ctx.body = await subscriptions
    .search(
      distributorId,
      criteria,
      page,
      maxPerPage
    )
  ;
});


module.exports = router;
