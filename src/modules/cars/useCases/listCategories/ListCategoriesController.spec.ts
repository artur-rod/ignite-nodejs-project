import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

describe("List Categories Controller", () => {
  let database: Connection;

  beforeAll(async () => {
    database = await createConnection();
    await database.runMigrations();

    const id = uuidV4();
    await database.query(
      `
      INSERT INTO CATEGORIES(id, name, description, created_at)
        values('${id}', 'Category Name', 'Category Description', 'now()')
      `
    );
  });

  afterAll(async () => {
    await database.dropDatabase();
    await database.close();
  });

  it("Should be able to list all categories", async () => {
    const { status, body } = await request(app).get("/categories");

    expect(status).toBe(200);
    expect(body.length).toBe(1);
    expect(body[0]).toHaveProperty("id");
    expect(body[0].name).toBe("Category Name");
  });
});
