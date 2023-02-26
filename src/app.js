require("dotenv").config();

const Koa = require("koa");
const logger = require("koa-logger");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");

const config = require("./config");

const errorHandler = require("./middlewares/error-handler");

const controllers = require("./routes");
const app = new Koa();

const { port } = config;

// prettier-ignore
app
  .use(errorHandler)
  .use(logger())
  .use(cors())
  .use(
    bodyParser({ enableTypes: ["json"] })
  )
  .use(controllers.distributors.routes())
  .use(controllers.subscriptions.routes())
;

app.listen(port);

console.log(`Listening on port ${port}`);
