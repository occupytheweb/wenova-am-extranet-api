const Router = require("@koa/router");

const distributors = require("../../resources/distributors.resource");
const validators = require("./distributors.validators");

const router = new Router({
  prefix: "/distributors",
});

router.get("/", (ctx) => {
  ctx.body = distributors.list();
});

router.head("/:id", (ctx) => {
  const id = validators.getValidatedIdFromRequestParamsIfPossible(ctx);

  ctx.status = distributors.exists(id) ? 200 : 404;
});

router.get("/:id", (ctx) => {
  const id = validators.getValidatedIdFromRequestParamsIfPossible(ctx);
  const potentialDistributor = distributors.getById(id);

  if (!!potentialDistributor) {
    ctx.body = potentialDistributor;
  } else {
    ctx.status = 404;
  }
});

router.put("/:id", (ctx) => {
  const id = validators.getValidatedIdFromRequestParamsIfPossible(ctx);
  const potentialDistributor = distributors.getById(id);

  if (!!potentialDistributor) {
    const patchToApply =
      validators.getValidatedPartialDistributorPayloadIfPossible(ctx);

    ctx.body = distributors.update(id, patchToApply);
  } else {
    ctx.status = 404;
  }
});

router.post("/", (ctx) => {
  const distributorToCreate = ctx.request.body;
  ctx.status = 201;
  ctx.body = distributors.create(distributorToCreate);
});

module.exports = router;
