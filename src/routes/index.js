module.exports = {
  auth: require("./auth/auth.routes"),
  distributors: require("./distributors/distributors.routes"),
  subscriptions: require("./subscriptions/subscriptions.routes"),
  payments: require("./payments/payments.routes"),
};
