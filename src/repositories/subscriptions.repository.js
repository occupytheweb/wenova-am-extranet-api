let db = require("./subscriptions.json");

const list = () => db;

const search = (product, distributorId) => {
  return list()
    .filter((subscription) => subscription.Id_dist === distributorId)
    .filter((subscription) => subscription.Produit === product);
};

const search = (product, distributorId, page, maxPerPage) => {
  const matchingSubscriptions = search(product, distributorId);

  const effectivePage = page > 0 ? page : 1;
  const startIndex = (effectivePage - 1) * maxPerPage;
  const endIndex = startIndex + maxPerPage;

  return matchingSubscriptions.slice(startIndex, endIndex);
};

module.exports = {
  search,
};
