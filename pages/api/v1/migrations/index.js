import migrationRunner from "node-pg-migrate";
import database from "infra/database.js";
import { join } from "node:path";

export default async function migrations(request, response) {
  if (!["GET", "POST"].includes(request.method)) {
    return response.status(405).json({
      error: `MEthod ${request.method} not allowed`,
    });
  }

  let dbClient;
  try {
    dbClient = await database.getNewClient();

    let dryRun = true;
    if (request.method === "POST") {
      dryRun = false;
    }

    const migrations = await migrationRunner({
      dbClient,
      dryRun,
      dir: join("infra", "migrations"),
      direction: "up",
      migrationsTable: "pgmigrations",
      verbose: true,
    });
    await dbClient.end();

    let responseStatus = 200;
    if (request.method === "POST" && migrations.length > 0) {
      responseStatus = 201;
    }

    response.status(responseStatus).json(migrations);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    try {
      await dbClient?.end();
    } finally {
    }
  }
}
