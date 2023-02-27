const Router = require("@koa/router");

const payments    = require("../../resources/payments.resource");
const validators  = require("./payments.validators");
const pagination  = require("../../utils/pagination");
const authService = require("../../services/auth.service");


const router = new Router({
  prefix: "/payments",
});

router.get("/", async (ctx) => {
  const { userId: distributorId } = authService.getUserFromAuthenticatedRequest(ctx);

  const criteria = validators.validateAndGetSearchCriteria(ctx);
  const { page, maxPerPage } = pagination.getPaginationParams(ctx);

  ctx.body = await payments
    .search(
      distributorId,
      criteria,
      page,
      maxPerPage
    )
  ;
});


module.exports = router;
