const Router = require("@koa/router");
const validators  = require("./users.validators");
const authService = require("../../services/auth.service");
const userService = require("../../services/users.service");


const router = new Router({
  prefix: "/users",
});

router.put("/me", async (ctx) => {
  const credentials = validators.getValidatedCredentialsPayload(ctx);
  const {
    currentPassword,
    newPassword,
  } = credentials;
  const { userId } = authService.getUserFromAuthenticatedRequest(ctx);

  await userService.changePassword(
    userId,
    currentPassword,
    newPassword
  );
  ctx.status = 202;
});


module.exports = router;
