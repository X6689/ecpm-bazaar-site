import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import * as nextEnv from "@next/env";
import { fetchTopOnFullReport, normalizeTopOnReport } from "../lib/topon";
import { writeRows } from "../lib/store";

async function main() {
  const projectRoot = process.cwd();
  const { loadEnvConfig } = nextEnv;
  loadEnvConfig(projectRoot);
  const payload = await fetchTopOnFullReport();
  const rows = normalizeTopOnReport(payload);
  const snapshot = await writeRows(rows, "topon");

  await mkdir(path.join(projectRoot, "data"), { recursive: true });
  await writeFile(
    path.join(projectRoot, "data", "last-topon-raw.json"),
    JSON.stringify(payload, null, 2),
    "utf8"
  );

  console.log(`Synced ${snapshot.rows.length} TopOn rows at ${snapshot.updatedAt}`);
  console.log(`Alerts: ${snapshot.alerts.length}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
