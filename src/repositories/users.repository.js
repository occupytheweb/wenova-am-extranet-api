const SQL = require("sql-template-strings");

const dbService    = require("../services/db.service");
const distributors = require("./distributors.repository");


const db = () => dbService.getPool();


const userMapper = (dbRepresentation) => ({
  id:               dbRepresentation.id_dist,
  hashedPassword:   dbRepresentation.password_hash,
  creationTime:     dbRepresentation.creation_time,
  modificationTime: dbRepresentation.modification_time,
  otp:              dbRepresentation.otp,
  otpValidUntil:    dbRepresentation.otp_valid_until,
  ...(
    !!dbRepresentation.first_name
      ? { firstName: dbRepresentation.first_name }
      : {}
  ),
  ...(
    !!dbRepresentation.last_name
      ? { lastName: dbRepresentation.last_name }
      : {}
  ),
});


const list = () => db()
  .query(SQL`SELECT * FROM users`)
  .then(
    ([rows]) => rows.map(userMapper)
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
    ([rows]) => rows
      .map(userMapper)
      .find(() => true)
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


const updateUserPassword = (userId, passwordHash) => db()
  .query(
    SQL`
      UPDATE users
         SET password_hash = ${passwordHash}
       WHERE id_dist = ${userId}
    `
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
    ([rows]) => rows.map(userMapper)
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


const saveOtpDetails = (
  userId,
  otp,
  validUntil
) => {
  const query = SQL`
    UPDATE users
    SET
      otp             = ${otp},
      otp_valid_until = ${validUntil}
    WHERE id_dist = ${userId}
  `;

  return db()
    .query(query)
  ;
};


module.exports = {
  userMapper,
  list,
  findById,
  findByEmail,
  updateUserPassword,
  searchMissingUsers,
  bulkCreate,
  saveOtpDetails,
};
