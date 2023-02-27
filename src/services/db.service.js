const mysql = require("mysql2/promise");

const { dbConnectionProperties } = require("../config");


let pool;

const init = () => {
  if (!pool) {
    console.info("[DB] Initializing connection pool...");
    pool = mysql.createPool(dbConnectionProperties);

    console.info("[DB] Testing connection...");
    pool
      .query("SELECT 1 as healthcheck")
      .then(
        () => {
          console.info("[DB] Connection pool initialized.");
        }
      )
      .catch((error) => {
        console.error("[DB] Failed to connect to db.");

        throw error;
      });
  } else {
    console.error("Connection pool already initialized");
  }
};

const getPool = () => pool;


module.exports = {
  init,
  getPool,
};
