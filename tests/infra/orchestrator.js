import retry from "async-retry";

async function waitForAllServicesToBeReady() {
  await waitForWebserver();
}

async function waitForWebserver() {
  return retry(fetchPingPage, {
    retries: 100,
    maxTimeout: 1000,
  });
}

async function fetchPingPage(bail) {
  const pingUrl = "http://localhost:3000/api/v1/ping";

  const response = await fetch(pingUrl);
  if (response.status !== 200) {
    throw new Error("Server not ready!");
  }

  const responseBody = await response.text();
  if (responseBody !== "pong") {
    return bail(new Error("Server malfunction!"));
  }
}

const orchestrator = {
  waitForAllServicesToBeReady,
};

export default orchestrator;
