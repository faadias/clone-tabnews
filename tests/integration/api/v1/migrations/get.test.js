import database from "infra/database.js";

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public");
}

beforeEach(async () => {
  await cleanDatabase();
});

test("GET /api/v1/migrations deve retornar 200 com um array", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
});

test("GET /api/v1/migrations deve retornar um array não vazio quando há migrations pendentes", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  const responseBody = await response.json();
  expect(responseBody.length).toBeGreaterThan(0);
});
