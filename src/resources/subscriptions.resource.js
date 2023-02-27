const repository = require("../repositories/subscriptions.repository");
const config     = require("../config");
const pagination = require("../utils/pagination");


const search = (
  distributorId,
  criteria,
  page = 1,
  maxPerPage = config.maxItemsPerPage
) => Promise
  .all(
    [
      repository.searchPaged(distributorId, criteria, page, maxPerPage),
      repository.getTotalNumberOfRows(distributorId, criteria),
    ]
  )
  .then(
    ([data, count]) => ({
      data,
      paginationMetadata: {
        ...pagination.getPaginationMetadata(
          count,
          page,
          maxPerPage
        ),
      },
    })
  )
;

const searchByDistributor = (
  distributorId,
  page = 1,
  maxPerPage = config.maxItemsPerPage
) => search(distributorId, {}, page, maxPerPage);


module.exports = {
  searchByDistributor,
  search,
};
