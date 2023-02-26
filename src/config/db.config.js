const Joi = require("joi");

const DEFAULT_HOST = "localhost";
const DEFAULT_PORT = 3306;
const DEFAULT_POOL_SIZE = 10;

const dbConnectionPropertiesCandidate = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME,
  host: process.env.DB_HOST || DEFAULT_HOST,
  port: process.env.DB_PORT || DEFAULT_PORT,
  connectionLimit: process.env.DB_POOL_SIZE || DEFAULT_POOL_SIZE,
};

const dbConnectionOptionsSchema = Joi.object({
  user: Joi.string().required(),
  password: Joi.string().allow(""),
  database: Joi.string().required(),
  host: Joi.string().required(),
  port: Joi.number().required(),
  connectionLimit: Joi.number(),
});

try {
  Joi.assert(dbConnectionPropertiesCandidate, dbConnectionOptionsSchema);
} catch (validationError) {
  console.error(
    "Failed to validate your db connection properties. Check your app configuration"
  );

  throw validationError;
}

module.exports = {
  dbConnectionProperties: dbConnectionPropertiesCandidate,
};
