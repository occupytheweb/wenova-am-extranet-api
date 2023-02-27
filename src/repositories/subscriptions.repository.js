const SQL = require("sql-template-strings");

const dbService  = require("../services/db.service");
const pagination = require("../utils/pagination");


const db = () => dbService.getPool();


const list = () => db()
  .query(SQL`SELECT * FROM Souscriptions`)
  .then(
    ([rows]) => rows
  )
;


const getSearchCriteriaClause = (
  distributorId,
  criteria
) => {
  const condition = SQL`
    WHERE Id_dist = ${distributorId}
  `;

  const { product } = criteria;
  if (!!product) {
    condition.append(
      SQL`
        AND Produit = ${product}
      `
    );
  }

  return condition;
};


const getPagedSearchCriteriaClause = (
  distributorId,
  criteria,
  startIndex,
  maxPerPage
) => getSearchCriteriaClause(
  distributorId,
  criteria
).append(
  SQL`
    ORDER BY ID DESC
    LIMIT ${startIndex}, ${maxPerPage}
  `
);


const search = (distributorId, criteria) => db()
  .query(SQL`SELECT * FROM Souscriptions`)
  .append(
    getSearchCriteriaClause(
      distributorId,
      criteria
    )
  )
  .then(
    ([rows]) => rows
  )
;


const getTotalNumberOfRows = (distributorId, criteria) => db()
  .query(
    SQL`SELECT count(1) as count FROM Souscriptions`
      .append(
        getSearchCriteriaClause(
          distributorId,
          criteria
        )
      )
  )
  .then(
    ([rows]) => {
      const { count } = rows.find(() => true);

      return count;
    }
  )
;


const searchPaged = (distributorId, criteria, page, maxPerPage) => {
  const { startIndex } = pagination.getPaginationIndices(
    page,
    maxPerPage
  );

  return db()
    .query(
      SQL`SELECT * FROM Souscriptions`
        .append(
          getPagedSearchCriteriaClause(
            distributorId,
            criteria,
            startIndex,
            maxPerPage
          )
        )
    )
    .then(
      ([rows]) => rows
    )
  ;
};


module.exports = {
  list,
  search,
  searchPaged,
  getTotalNumberOfRows,
};
