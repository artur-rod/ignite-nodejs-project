import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

describe("Create Category Controller", () => {
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

    sessionToken = session.body.access_token;
  });

  afterAll(async () => {
    await database.dropDatabase();
    await database.close();
  });

  it("Should be able to create a category", async () => {
    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Name",
        description: "Category Description",
      })
      .set({
        Authorization: `Bearer ${sessionToken}`,
      });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create a category with an existent name", async () => {
    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Name",
        description: "Category Description",
      })
      .set({
        Authorization: `Bearer ${sessionToken}`,
      });

    expect(response.status).toBe(400);
  });
});
