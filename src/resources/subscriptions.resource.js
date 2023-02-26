const repository = require("../repositories/subscriptions.repository");

const config = require("../config");
const pagination = require("../utils/pagination");

const searchByDistributor = (
  distributorId,
  page = 1,
  maxPerPage = config.maxItemsPerPage
) => {
  return search(distributorId, {}, page, maxPerPage);
};

const search = (
  distributorId,
  criteria,
  page = 1,
  maxPerPage = config.maxItemsPerPage
) => {
  const data = repository.searchPaged(distributorId, {}, page, maxPerPage);
  const count = repository.count(distributorId, {});

  return {
    data,
    ...pagination.getPaginationMetadata(count, page, maxPerPage),
  };
};

module.exports = {
  searchByDistributor,
  search,
};
