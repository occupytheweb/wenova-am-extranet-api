const SQL = require("sql-template-strings");

const dbService = require("../services/db.service");

const db = () => dbService.getPool();

const list = () =>
  db()
    .query(SQL`SELECT * from distributeurs`)
    .then(([rows, fields]) => rows);
const existsById = (id) => getById(id).then((distributor) => !!distributor);

const existsByEmail = (email) =>
  findByEmail(email).then((distributor) => !!distributor);

const getById = (id) =>
  db()
    .query(
      SQL`
      SELECT * FROM distributeurs
      WHERE id_dist = ${id}
    `
    )
    .then(([rows, fields]) => rows.find((_) => true));
const findByEmail = (email) => {
  return db()
    .query(
      SQL`
        SELECT * from distributeurs
        WHERE email_signataire = ${email}
      `
    )
    .then(([rows, fields]) => rows.find((_) => true));
};

const update = (id, sanitizedNewRepresentation) => {
  return db().query(
    getDistributorUpdateStatement(id, sanitizedNewRepresentation)
  );
};

const getDistributorUpdateStatement = (id, sanitizedNewRepresentation) => {
  const queryPrefix = SQL`
    UPDATE distributeurs
    SET
  `;

  const [lastProperty, ...properties] = Object.entries(
    sanitizedNewRepresentation
  ).reverse();
  const [lastKey, lastValue] = lastProperty;

  const queryAssignments = properties
    .reduce(
      (accumulator, [key, value]) =>
        accumulator.append(` ${key} = `).append(SQL` ${value}, `),
      SQL``
    )
    .append(` ${lastKey} = `)
    .append(SQL` ${lastValue} `);
  return queryPrefix.append(queryAssignments).append(SQL`
      WHERE id_dist = ${id}`);
};

module.exports = {
  list,
  existsById,
  existsByEmail,
  getById,
  findByEmail,
  update,
};
