import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { evaluateAlerts } from "./alerts";
import { demoRows } from "./demo-data";
import type { DataSnapshot, MetricRow } from "./types";

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "snapshot.json");

export async function readSnapshot(): Promise<DataSnapshot> {
  try {
    const content = await readFile(dataFile, "utf8");
    return JSON.parse(content) as DataSnapshot;
  } catch {
    return createSnapshot(demoRows, "demo");
  }
}

export async function writeRows(rows: MetricRow[], source: DataSnapshot["source"]) {
  await mkdir(dataDir, { recursive: true });
  const snapshot = createSnapshot(rows, source);
  await writeFile(dataFile, JSON.stringify(snapshot, null, 2), "utf8");
  return snapshot;
}

export function createSnapshot(rows: MetricRow[], source: DataSnapshot["source"]): DataSnapshot {
  return {
    updatedAt: new Date().toISOString(),
    source,
    rows,
    alerts: evaluateAlerts(rows)
  };
}
