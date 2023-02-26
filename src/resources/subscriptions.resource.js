const repository = require("../repositories/subscriptions.repository");

const search = (product, distributorId) =>
  repository.search(product, distributorId);

const search = (product, distributorId, page, maxPerPage) =>
  repository.search(product, distributorId, page, maxPerPage);
module.exports = {
  search,
};
