const auth          = require("./auth/auth.routes");
const distributors  = require("./distributors/distributors.routes");
const subscriptions = require("./subscriptions/subscriptions.routes");
const payments      = require("./payments/payments.routes");
const users         = require("./users/users.routes");


module.exports = {
  auth,
  distributors,
  subscriptions,
  payments,
  users,
};
