import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "database"): Promise<Connection> => {
  const connectionOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(connectionOptions, {
      host,
    })
  );
};
