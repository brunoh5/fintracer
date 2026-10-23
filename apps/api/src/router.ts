import { type Request, type Response, Router } from 'express';
import database from './infra/database/index.js';

export const router = Router();

router.get('/status', async (_: Request, res: Response) => {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query({
    text: `SHOW server_version`,
  });
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectiosResult = await database.query({
    text: 'SHOW max_connections',
  });
  const databaseMaxConnectionsValue =
    databaseMaxConnectiosResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: 'SElECT count(*)::int FROM pg_stat_activity WHERE datname = $1;',
    values: [databaseName],
  });
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;

  return res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue, 10),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
});
