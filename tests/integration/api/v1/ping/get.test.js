test("GET /api/v1/ping deve retornar 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/ping");
  expect(response.status).toBe(200);
});
test("GET /api/v1/ping deve retornar o texto `pong`", async () => {
  const response = await fetch("http://localhost:3000/api/v1/ping");
  const responseBody = await response.text();
  expect(responseBody).toBe("pong");
});
