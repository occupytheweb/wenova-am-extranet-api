require("dotenv").config();

const Koa = require("koa");
const logger = require("koa-logger");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");

const errorHandler = require("./middlewares/error-handler");

const controllers = require("./routes");
const app = new Koa();

const DEFAULT_PORT = 4000;
const port = process.env.PORT || DEFAULT_PORT;

// prettier-ignore
app
  .use(errorHandler)
  .use(logger())
  .use(cors())
  .use(
    bodyParser({ enableTypes: ["json"] })
  )
  .use(controllers.distributors.routes())
;

app.listen(port);

console.log(`Listening on port ${port}`);
