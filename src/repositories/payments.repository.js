const db = require("./payments.json");

const pagination = require("../utils/pagination");


const list = () => db;

const search = (distributorId, criteria) => {
  const { year } = criteria;

  const filters = [
    (payment) => payment.id_dist === distributorId,
    ...(!!year ? [(payment) => /`${year}`/.test(payment.periode)] : []),
  ];

  return filters.reduce(
    (accumulator, filter) => accumulator.filter(filter),
    list()
  );
};

const count = (distributorId, criteria) => search(distributorId, criteria).length;

const searchPaged = (distributorId, criteria, page, maxPerPage) => {
  const matchingPayments = search(distributorId, criteria);

  const { startIndex, endIndex } = pagination.getPaginationIndices(
    page,
    maxPerPage
  );

  return matchingPayments.slice(startIndex, endIndex);
};


module.exports = {
  count,
  searchPaged,
};
