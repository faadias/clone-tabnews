import database from "infra/database.js";

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public");
}

beforeEach(async () => {
  await cleanDatabase();
});

test("POST  /api/v1/migrations deve retornar 201 com um array das migrations executadas", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response.status).toBe(201);

  const reponseBody = await response.json();
  expect(Array.isArray(reponseBody)).toBe(true);
  expect(reponseBody.length).toBeGreaterThan(0);
});

test("POST  /api/v1/migrations deve executar as migrations pendentes", async () => {
  let response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  const reponseBody = await response.json();
  expect(reponseBody.length).toBe(0);
});

test("POST  /api/v1/migrations deve retornar 200 se não houver migrations pendentes", async () => {
  let response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response.status).toBe(201);

  response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response.status).toBe(200);
});
