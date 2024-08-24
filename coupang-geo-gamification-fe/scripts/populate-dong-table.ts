import seoulJson from "../assets/maps/seoul-dong.json";

export function populateDongTable() {
  const dongs = seoulJson.features;
  const insertStatements: string[] = dongs.map((item) => {
    const code = item.properties["AdministrativeDongCode"];
    const name = item.properties["AdministrativeDongName"];
    return `('${code}', '${name}')`;
  });

  // Combine all insert statements into one SQL command
  const sqlInsertCommand = `INSERT INTO dong (AdministrativeDongCode, AdministrativeDongName) VALUES ${insertStatements.join(", ")};`;
  console.log(sqlInsertCommand);
}
