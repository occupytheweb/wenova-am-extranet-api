require("dotenv").config();

const Koa = require("koa");
const logger = require("koa-logger");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");

const config = require("./config");

const errorHandler = require("./middlewares/error-handler");
const jwtValidator = require("./middlewares/jwt-validator");

const controllers = require("./routes");


require("./services/db.service").init();

const app = new Koa();
// prettier-ignore
app
  .use(errorHandler)
  .use(logger())
  .use(cors())
  .use(
    bodyParser({ enableTypes: ["json"] })
  )
  .use(jwtValidator())
  .use(controllers.auth.routes())
  .use(controllers.distributors.routes())
  .use(controllers.subscriptions.routes())
  .use(controllers.payments.routes())
;

const { port } = config;
app.listen(port);

console.log(`Listening on port ${port}`);
