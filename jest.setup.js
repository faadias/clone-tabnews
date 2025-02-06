import orchestrator from "tests/infra/orchestrator.js";

beforeAll(async () => await orchestrator.waitForAllServicesToBeReady());
