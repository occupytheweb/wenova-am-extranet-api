const db = require("./users.json");

const distributors = require("./distributors.repository");

const list = () => db;

const findById = (distributorId) => {
  return list().find((user) => user.id_dist === distributorId);
};

const findByEmail = (email) => {
  return distributors
    .findByEmail(email)
    .then((distributor) =>
      !!distributor
        ? list().find((user) => user.id_dist === distributor.id_dist)
        : null
    );
};

module.exports = {
  findById,
  findByEmail,
};
