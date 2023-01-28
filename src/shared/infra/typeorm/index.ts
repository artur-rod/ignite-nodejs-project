import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "database"): Promise<Connection> => {
  const connectionOptions = await getConnectionOptions();

  const { NODE_ENV } = process.env;
  const DEFAULT_DATABASE = connectionOptions.database;

  return createConnection(
    Object.assign(connectionOptions, {
      host: NODE_ENV === "test" ? "localhost" : host,
      database: NODE_ENV === "test" ? "rentalx_test" : DEFAULT_DATABASE,
    })
  );
};
