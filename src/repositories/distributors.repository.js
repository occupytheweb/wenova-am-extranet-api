const SQL = require("sql-template-strings");

const dbService = require("../services/db.service");


const db = () => dbService.getPool();


const list = () => db()
  .query(SQL`SELECT * from distributeurs`)
  .then(
    ([rows]) => rows
  )
;

const getById = (id) => db()
  .query(
    SQL`
      SELECT * FROM distributeurs
      WHERE id_dist = ${id}
    `
  )
  .then(
    ([rows]) => rows.find(() => true)
  )
;

const findByEmail = (email) => db()
  .query(
    SQL`
        SELECT * from distributeurs
        WHERE email_signataire = ${email}
      `
  )
  .then(
    ([rows]) => rows.find(() => true)
  )
;

const existsById = (id) => getById(id)
  .then((distributor) => !!distributor)
;

const existsByEmail = (email) => findByEmail(email)
  .then((distributor) => !!distributor)
;

const getDistributorUpdateStatement = (id, sanitizedNewRepresentation) => {
  const queryPrefix = SQL`
    UPDATE distributeurs
    SET
  `;

  const [lastProperty, ...properties] = Object.entries(sanitizedNewRepresentation).reverse();
  const [lastKey, lastValue] = lastProperty;

  const queryAssignments = properties
    .reduce(
      (accumulator, [key, value]) => accumulator
        .append(` ${key} = `)
        .append(SQL` ${value}, `),
      SQL``
    )
    .append(` ${lastKey} = `)
    .append(SQL` ${lastValue} `)
  ;

  return queryPrefix
    .append(queryAssignments)
    .append(
      SQL`
        WHERE id_dist = ${id}`
    );
};

const update = (id, sanitizedNewRepresentation) => db()
  .query(
    getDistributorUpdateStatement(
      id,
      sanitizedNewRepresentation
    )
  )
;


module.exports = {
  list,
  existsById,
  existsByEmail,
  getById,
  findByEmail,
  update,
};
