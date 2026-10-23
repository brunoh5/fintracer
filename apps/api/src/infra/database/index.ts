import {
  Client,
  type QueryConfig,
  type QueryResult,
  type QueryResultRow,
} from 'pg';

const client = new Client({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  ssl: getSSLValues(),
});

client.connect().then(() => console.info('Database connected'));

type QueryFn = <T extends QueryResultRow = QueryResultRow>(query: {
  text: string;
  values?: unknown[];
}) => Promise<QueryResult<T>>;

async function query<T extends QueryResultRow = QueryResultRow>(
  query: QueryConfig,
): Promise<QueryResult<T>> {
  try {
    const result = await client.query(query);
    return result;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

async function transactions<T>(
  callback: (query: QueryFn) => Promise<T>,
): Promise<T> {
  const transactionConnection = await client.connect();

  try {
    await transactionConnection.query('BEGIN');

    const result = await callback(query);

    await transactionConnection.query('COMMIT');

    return result;
  } catch (error) {
    console.log(error);

    throw error;
  } finally {
    transactionConnection.end();
  }
}

const database = {
  query,
  transactions,
};

export default database;

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV === 'production';
}
