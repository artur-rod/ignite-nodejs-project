import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

describe("List Categories Controller", () => {
  let database: Connection;
  let sessionToken: string;

  beforeAll(async () => {
    database = await createConnection();
    await database.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);
    await database.query(
      `
      INSERT INTO USERS(id, name, email, password, admin, driver_license, created_at)
        values('${id}', 'Admin', 'admin@email.com.br', '${password}', true, '12345', 'now()')
      `
    );

    const session = await request(app).post("/sessions").send({
      email: "admin@email.com.br",
      password: "admin",
    });

    sessionToken = session.body.token;
  });

  afterAll(async () => {
    await database.dropDatabase();
    await database.close();
  });

  it("Should be able to list all categories", async () => {
    await request(app)
      .post("/categories")
      .send({
        name: "Category Name",
        description: "Category Description",
      })
      .set({
        Authorization: `Bearer ${sessionToken}`,
      });

    const { status, body } = await request(app).get("/categories");

    expect(status).toBe(200);
    expect(body.length).toBe(1);
    expect(body[0]).toHaveProperty("id");
    expect(body[0].name).toBe("Category Name");
  });
});
