import * as fs from "fs";
import * as path from "path";
import pg from "pg";
import exec from "@/scripts/utils/exec";

// Load the JSON data
const filePath = path.join(__dirname, "../assets/maps/seoul-dong.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

// Generate SQL insert statements
const insertStatements: string[] = data.map(
  (item: {
    AdministrativeDongCode: string;
    AdministrativeDongName: string;
  }) => {
    const code = item.AdministrativeDongCode;
    const name = item.AdministrativeDongName;
    return `('${code}', '${name}')`;
  },
);

// Combine all insert statements into one SQL command
const sqlInsertCommand = `INSERT INTO dong (AdministrativeDongCode, AdministrativeDongName) VALUES ${insertStatements.join(", ")};`;

(async () => {
  const pgPool = new pg.Pool({
    connectionString: process.env.ConnectionString,
  });

  pgPool.on("error", (error) => console.log("pgPool error:", error.message));

  await pgPool.query('select true as "Connection test";');

  const client = await pgPool.connect();

  try {
    await client.query(sqlInsertCommand);
  } catch (e) {
    console.log(e);
  }

  await pgPool.end();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
