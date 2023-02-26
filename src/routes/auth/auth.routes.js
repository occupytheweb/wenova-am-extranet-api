const Router = require("@koa/router");

const validators = require("./auth.validators");
const authService = require("../../services/auth.service");

const router = new Router({
  prefix: "/auth",
});

router.post("/token", async (ctx) => {
  const credentials = validators.getValidatedCredentialsPayload(ctx);

  const { email, password } = credentials;

  const token = await authService
    .authenticateAndGetToken(ctx, email, password)
    .then((jwt) => jwt.compact());

  ctx.body = { token };
});

module.exports = router;
