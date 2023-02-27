const SQL = require("sql-template-strings");

const dbService  = require("../services/db.service");
const pagination = require("../utils/pagination");


const db = () => dbService.getPool();


const list = () => db()
  .query(SQL`SELECT * FROM com_note`)
  .then(
    ([rows]) => rows
  )
;


const getSearchCriteriaClause = (
  distributorId,
  criteria
) => {
  const condition = SQL`
    WHERE id_dist = ${distributorId}
  `;

  const { year } = criteria;
  if (!!year) {
    const yearCriteria = `%${year}%`;

    condition.append(
      SQL`
        AND periode LIKE ${yearCriteria}
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
    ORDER BY note_date DESC
    LIMIT ${startIndex}, ${maxPerPage}
  `
);


const search = (distributorId, criteria) => db()
  .query(SQL`SELECT * FROM com_note`)
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
    SQL`SELECT count(1) as count FROM com_note`
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
      SQL`SELECT * FROM com_note`
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
