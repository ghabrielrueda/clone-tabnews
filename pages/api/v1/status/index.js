import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const versionResult = await database.query("SHOW server_version;");
  const versionValue = versionResult.rows[0].server_version;
  const maxConnectionResult = await database.query("SHOW max_connections;");
  const maxConnectionValue = maxConnectionResult.rows[0].max_connections;
  //Usar a crase indica que é uma template string, permitindo interpolação de variáveis e expressões dentro da string.
  const databaseName = process.env.POSTGRES_DB;
  const usedConnectionResult = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const usedConnectionValue = usedConnectionResult.rows[0].count;

  response.status(200).json({
    update_at: updatedAt,
    dependencies: {
      database: {
        version: versionValue,
        maxconnection: parseInt(maxConnectionValue),
        opened_connection: usedConnectionValue,
      },
    },
  });
}

export default status;
