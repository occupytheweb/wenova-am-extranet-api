let db = require("./subscriptions.json");

const pagination = require("../utils/pagination");

const list = () => db;

const search = (distributorId, criteria) => {
  const { product } = criteria;

  const filters = [
    (subscription) => subscription.Id_dist === distributorId,
    ...(!!product ? [(subscription) => subscription.Produit === product] : []),
  ];

  return filters.reduce(
    (accumulator, filter) => accumulator.filter(filter),
    list()
  );
};

const count = (distributorId, criteria) =>
  search(distributorId, criteria).length;

const searchPaged = (distributorId, criteria, page, maxPerPage) => {
  const matchingSubscriptions = search(distributorId, criteria);

  const { startIndex, endIndex } = pagination.getPaginationIndices(
    page,
    maxPerPage
  );

  return matchingSubscriptions.slice(startIndex, endIndex);
};

module.exports = {
  count,
  searchPaged,
};
