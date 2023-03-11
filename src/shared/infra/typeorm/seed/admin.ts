import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import databaseConnection from "../index";

async function create() {
  const database = await databaseConnection();

  const id = uuidV4();
  const password = await hash("admin", 8);

  await database.query(
    `
    INSERT INTO USERS(id, name, email, password, admin, driver_license, created_at)
      values('${id}', 'Admin', 'admin@email.com.br', '${password}', true, '12345', 'now()')
    `
  );

  await database.close();
}

create().then(() => console.log("Admin user created"));
