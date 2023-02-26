const db = require("./users.json");

const distributors = require("./distributors.repository");

const list = () => db;

const findById = (distributorId) => {
  return list().find((user) => user.id_dist === distributorId);
};

const findByEmail = (email) => {
  const potentialDistributor = distributors.findByEmail(email);

  if (!!potentialDistributor) {
    return list().find((user) => user.id_dist === potentialDistributor.id_dist);
  }
};

module.exports = {
  findById,
  findByEmail,
};
