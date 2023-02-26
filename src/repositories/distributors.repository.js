let db = require("./distributors.json");

const list = () => db;

const exists = (id) => !!getById(id);

const getById = (id) => db.find((distributor) => distributor.id_dist === id);

const findByEmail = (email) =>
  db.find((distributor) => distributor.email_signataire === email);

const update = (id, sanitizedNewRepresentation) => {
  db.splice(
    db.findIndex((distributor) => distributor.id_dist === id),
    1,
    sanitizedNewRepresentation
  );
};

const create = (sanitizedNewDistributor) => {
  const [...lastId] = db;

  const newDistributor = {
    id: lastId + 1,
    ...sanitizedNewDistributor,
  };

  db = [...db, newDistributor];

  return newDistributor;
};

module.exports = {
  list,
  exists,
  getById,
  findByEmail,
  update,
  create,
};
