test("GET /api/v1/status deve retornar 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
});

test("GET /api/v1/status deve retornar um objeto com `updated_at` com uma data válida", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const responseBody = await response.json();
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
});

test("GET /api/v1/status deve retornar um objeto dependencies", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const responseBody = await response.json();
  expect(responseBody.dependencies).toBeDefined();
});

test("GET /api/v1/status deve retornar um objeto database com `version`, `max_connections` e `open_connections`", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const responseBody = await response.json();
  const dependencies = responseBody.dependencies;
  expect(dependencies.database.version).toMatch(/^[1-9]+[.][0-9]+$/);
  expect(dependencies.database.max_connections).toBeGreaterThan(0);
  expect(dependencies.database.open_connections).toBe(1);
});
