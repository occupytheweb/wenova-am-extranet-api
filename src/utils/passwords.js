const bcrypt = require("bcrypt");


const SALT_ROUNDS = 10;


const hashPlaintextPassword = (plaintextPassword) => bcrypt
  .genSalt(SALT_ROUNDS)
  .then(
    (salt) => bcrypt.hash(plaintextPassword, salt)
  )
;

const plaintextPasswordMatchesStoredHash = (
  plaintextPassword,
  hash
) => bcrypt.compare(plaintextPassword, hash);

const generateInitialPassword = (
  firstName,
  lastName
) => `${firstName}_${lastName}@wenova`;

const generateInitialPasswordHash = (
  firstName,
  lastName
) => hashPlaintextPassword(
  generateInitialPassword(
    firstName,
    lastName
  )
);

const passwordIsInitialPassword = (
  firstName,
  lastName,
  hashedPassword
) => plaintextPasswordMatchesStoredHash(
  generateInitialPassword(
    firstName,
    lastName
  ),
  hashedPassword
);


module.exports = {
  hashPlaintextPassword,
  plaintextPasswordMatchesStoredHash,
  generateInitialPasswordHash,
  passwordIsInitialPassword,
};
