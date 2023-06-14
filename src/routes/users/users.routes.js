const Router = require("@koa/router");
const validators  = require("./users.validators");
const authService = require("../../services/auth.service");
const userService = require("../../services/users.service");
const forgotPasswordService = require("../../services/forgot-password.service");


const router = new Router({
  prefix: "/users",
});

router.put("/me/password", async (ctx) => {
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


router.put("/me/password/initial", async (ctx) => {
  const credentials = validators.getValidatedInitialCredentialsPayload(ctx);
  const {
    initialPassword,
  } = credentials;
  const { userId } = authService.getUserFromAuthenticatedRequest(ctx);

  if (await userService.userHasInitialPassword(userId)) {
    console.log(`[/users] Changing initial password for user <${userId}>...`);

    await userService.changeInitialPassword(
      userId,
      initialPassword
    );
    ctx.status = 202;

  } else {
    console.log(`[/users] Initial password already set for user <${userId}>...`);

    ctx.status = 410;
    ctx.body = {
      statusCode: ctx.status,
      message:    "Initial password already set",
    };
  }
});


router.get("/me/password/change-status", async (ctx) => {
  const { userId } = authService.getUserFromAuthenticatedRequest(ctx);

  ctx.body = {
    isInitialPassword: await userService.userHasInitialPassword(userId),
  };
});


router.put("/me/password/forgotten", async (ctx) => {
  const { email } = validators.getValidatedForgotPasswordPayload(ctx);

  console.debug(`[USERS] user '${email}' requested a forgot password link.`);

  return forgotPasswordService.launchForgotPasswordProcessForUser(email);
});


module.exports = router;
