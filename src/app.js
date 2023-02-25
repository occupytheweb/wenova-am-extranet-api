require("dotenv").config();

const Koa = require("koa");
const logger = require("koa-logger");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const _ = require("koa-route");

const app = new Koa();

const port = process.env.PORT || 3000;

// prettier-ignore
app
    .use(logger())
    .use(cors())
    .use(bodyParser());

app.listen(port);

console.log(`Listening on port ${port}`);
