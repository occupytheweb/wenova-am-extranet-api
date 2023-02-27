const Router = require("@koa/router");

const distributors = require("../../resources/distributors.resource");
const validators = require("./distributors.validators");

const authService = require("../../services/auth.service");

const router = new Router({
  prefix: "/distributors",
});

router.get("/", async (ctx) => {
  ctx.body = await distributors.list();
});

router.head("/:email", async (ctx) => {
  const email = validators.getValidatedEmailFromRequestParamsIfPossible(ctx);

  ctx.status = (await distributors.existsByEmail(email)) ? 200 : 404;
});

router.get("/me", async (ctx) => {
  const { userId } = authService.getUserFromAuthenticatedRequest(ctx);

  const potentialDistributor = await distributors.getById(userId);

  if (!!potentialDistributor) {
    ctx.body = potentialDistributor;
  } else {
    ctx.status = 404;
  }
});

router.put("/me", async (ctx) => {
  const { userId } = authService.getUserFromAuthenticatedRequest(ctx);
  const potentialDistributor = distributors.getById(userId);

  if (!!potentialDistributor) {
    const patchToApply =
      validators.getValidatedPartialDistributorPayloadIfPossible(ctx);

    await distributors.update(userId, patchToApply);
    ctx.status = 202;
  } else {
    ctx.status = 404;
  }
});

module.exports = router;
