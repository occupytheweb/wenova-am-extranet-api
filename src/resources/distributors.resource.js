const repository = require("../repositories/distributors.repository");


/**
 * Translates keys of an object conforming to either the {@link distributorOverviewSchema} or a
 * {@link distributorBillingSchema} to their db-level counterparts.
 */
const getEffectiveDistributorPatchPayload = (distributorPatchPayload) => {
  const translations = {
    firstName:    "first_name",
    lastName:     "last_name",
    email:        "email_signataire",
    billingEmail: "email_compta",
    iban:         "IBAN",
  };

  return Object
    .entries(distributorPatchPayload)
    .filter(
      ([key]) => key !== "id"
    )
    .reduce(
      (accumulator, [key, value]) => ({
        ...accumulator,
        ...(!!translations[key]
          ? { [translations[key]]: value }
          : { [key]: value }),
      }),
      {}
    );
};

const list = () => repository.list();

const existsById = (id) => repository.existsById(id);

const existsByEmail = (email) => repository.existsByEmail(email);

const getById = (id) => repository.getById(id);

const update = (id, patchToApply) => {
  const potentialDistributor  = getById(id);
  const effectivePatchPayload = getEffectiveDistributorPatchPayload(patchToApply);

  const sanitizedNewRepresentation = {
    ...potentialDistributor,
    ...effectivePatchPayload,
  };

  return repository.update(id, sanitizedNewRepresentation);
};


module.exports = {
  list,
  existsById,
  existsByEmail,
  getById,
  update,
};
