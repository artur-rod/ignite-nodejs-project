import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  const connectionOptions = await getConnectionOptions();

  const { NODE_ENV } = process.env;
  const DEFAULT_DATABASE = connectionOptions.database;

  return createConnection(
    Object.assign(connectionOptions, {
      database: NODE_ENV === "test" ? "rentalx_test" : DEFAULT_DATABASE,
    })
  );
};
