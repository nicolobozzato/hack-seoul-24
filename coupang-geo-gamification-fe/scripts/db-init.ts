import pg from "pg";
import "dotenv/config";

import exec from "./utils/exec";

const DB_TYPE = process.env.DB_TYPE || "postgres";

const DB_ROOT_URL = process.env.DB_ROOT_URL;

const DB_NAME = process.env.DB_NAME;

const DB_OWNER = process.env.DB_OWNER;
const DB_OWNER_PASSWORD = process.env.DB_OWNER_PASSWORD;

const DB_AUTHENTICATOR = process.env.DB_AUTHENTICATOR;
const DB_AUTHENTICATOR_PASSWORD = process.env.DB_AUTHENTICATOR_PASSWORD;

const DB_VISITOR = process.env.DB_VISITOR;

(async () => {
  const pgPool = new pg.Pool({ connectionString: DB_ROOT_URL });

  pgPool.on("error", (error) => console.log("pgPool error:", error.message));

  await pgPool.query('select true as "Connection test";');

  const client = await pgPool.connect();

  try {
    // This is the role that PostGraphile will switch to (from ${DB_AUTHENTICATOR}) during a GraphQL request
    await client.query(`CREATE ROLE ${DB_VISITOR};`);

    // This enables PostGraphile to switch from ${DB_AUTHENTICATOR} to ${DB_VISITOR}
    await client.query(`GRANT ${DB_VISITOR} TO ${DB_AUTHENTICATOR};`);
  } finally {
    await client.release();
  }

  await pgPool.end();

  await exec("npm", ["run", "gm", "--", "reset", "--erase"]);
  await exec("npm", ["run", "gm", "--", "reset", "--shadow", "--erase"]);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
