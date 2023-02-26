let db = require("./distributors.json");

const list = () => db;

const exists = (id) => !!getById(id);

const getById = (id) => db.find((distributor) => distributor.id_dist === id);

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
  update,
  create,
};
