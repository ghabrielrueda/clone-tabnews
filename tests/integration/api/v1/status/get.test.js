import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.update_at).toBeDefined();

  const parseUpdatedAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parseUpdatedAt);

  expect(responseBody.dependencies.database.version).toBe("16.0");
  expect(responseBody.dependencies.database.maxconnection).toBe(100);
  //prettier-ignore
  expect(responseBody.dependencies.database.opened_connection).toBeGreaterThanOrEqual(1);
});
