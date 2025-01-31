import database from "infra/database.js";

export default async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const databaseName = process.env.POSTGRES_DB;

  const dbVersionResult = await database.query("show server_version");
  const dbVersion = dbVersionResult.rows[0].server_version;

  const dbMaxConnectionsResult = await database.query("SHOW max_connections;");
  const dbMaxConnections = dbMaxConnectionsResult.rows[0].max_connections;

  const dbOpenConnectionsResult = await database.query({
    text: "SELECT count(*) open_connections FROM pg_stat_activity where datname = $1;",
    values: [databaseName],
  });
  const dbOpenConnections = dbOpenConnectionsResult.rows[0].open_connections;

  response.status(200).json({
    updated_at: updatedAt,
    env: process.env.NODE_ENV,
    dependencies: {
      database: {
        version: dbVersion,
        max_connections: parseInt(dbMaxConnections),
        open_connections: parseInt(dbOpenConnections),
      },
    },
  });
}
