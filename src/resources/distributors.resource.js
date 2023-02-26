const repository = require("../repositories/distributors.repository");

const list = () => repository.list();

const exists = (id) => repository.exists(id);

const getById = (id) => {
  return repository.getById(id);
};

const update = (id, patchToApply) => {
  const potentialDistributor = getById(id);
  const effectivePatchPayload =
    getEffectiveDistributorPatchPayload(patchToApply);

  const sanitizedNewRepresentation = {
    ...potentialDistributor,
    ...effectivePatchPayload,
  };

  repository.update(id, sanitizedNewRepresentation);
};

const create = (payload) => {
  return repository.create(payload);
};

/**
 * Translates keys of an object conforming to either the {@link distributorOverviewSchema} or a
 * {@link distributorBillingSchema} to their db-level counterparts.
 */
const getEffectiveDistributorPatchPayload = (distributorPatchPayload) => {
  delete distributorPatchPayload["id"];

  const translations = {
    firstName: "first_name",
    lastName: "last_name",
    email: "email_signataire",
    billingEmail: "email_compta",
    iban: "IBAN",
  };

  return Object.entries(distributorPatchPayload).reduce(
    (accumulator, [key, value]) => ({
      ...accumulator,
      ...(!!translations[key]
        ? { [translations[key]]: value }
        : { [key]: value }),
    }),
    {}
  );
};

module.exports = {
  list,
  exists,
  getById,
  update,
  create,
};
