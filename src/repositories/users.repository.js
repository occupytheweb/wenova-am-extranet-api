const SQL = require("sql-template-strings");

const dbService    = require("../services/db.service");
const distributors = require("./distributors.repository");


const db = () => dbService.getPool();


const list = () => db()
  .query(SQL`SELECT * FROM users`)
  .then(
    ([rows]) => rows
  )
;


const findById = (distributorId) => db()
  .query(
    SQL`
      SELECT * FROM users
      WHERE id_dist = ${distributorId}
    `
  )
  .then(
    ([rows]) => rows.find(() => true)
  )
;


const findByEmail = (email) => distributors
  .findByEmail(email)
  .then(
    (distributor) => (!!distributor
      ? findById(distributor.id_dist)
      : null)
  )
;


const searchMissingUsers = () => db()
  .query(
    SQL`
      SELECT
        *
        FROM distributeurs d
       WHERE d.id_dist not in (
         SELECT id_dist
           FROM users
       )
    `
  )
  .then(
    ([rows]) => rows
  )
;


const bulkCreate = (representations) => {
  if (!representations.length) {
    return Promise.resolve();
  }

  const queryPrefix = SQL`
    INSERT INTO users(
      id_dist,
      password_hash
    )
    VALUES
  `;
  const valuesStatementString = representations
    .reduce(
      (accumulator, representation) => [
        ...accumulator,
        `( ${representation.id}, '${representation.passwordHash}' )`,
      ],
      []
    )
    .join(", ")
  ;

  return db()
    .query(
      queryPrefix
        .append(valuesStatementString)
    )
  ;
};


module.exports = {
  list,
  findById,
  findByEmail,
  searchMissingUsers,
  bulkCreate,
};
