import { acceptedAliasGroups } from "./content/monetization-terms";
import { CsvParseError, getMissingRequiredFieldCategory, isInvalidNumericValue } from "./csv-upload-validation";
import type { MetricRow } from "./types";

export type CsvField =
  | "date"
  | "appName"
  | "placementName"
  | "adUnit"
  | "adFormat"
  | "country"
  | "network"
  | "mediation"
  | "revenue"
  | "ecpm"
  | "impressions"
  | "requests"
  | "matchedRequests"
  | "fills"
  | "clicks"
  | "fillRate"
  | "matchRate";

export type FieldStatus = {
  field: CsvField;
  label: string;
  required: boolean;
  matchedHeader?: string;
};

export type IssueKey =
  | "fallbackIssue"
  | "twoDatesIssue"
  | "sevenDayIssue"
  | "fillIssue"
  | "ecpmIssue"
  | "matchRateDefinitionNote"
  | "rowMatchIssue"
  | "lowVolumeIssue";

export type ParseCsvResult = {
  rows: MetricRow[];
  fields: FieldStatus[];
  issues: IssueKey[];
};

const fieldLabels: Record<CsvField, string> = {
  date: "date",
  appName: "appName",
  placementName: "placementName",
  adUnit: "adUnit",
  adFormat: "adFormat",
  country: "country",
  network: "network",
  mediation: "mediation",
  revenue: "revenue",
  ecpm: "ecpm",
  impressions: "impressions",
  requests: "requests",
  matchedRequests: "matchedRequests",
  fills: "fills",
  clicks: "clicks",
  fillRate: "fillRate",
  matchRate: "matchRate"
};

const fieldAliases = Object.fromEntries(
  acceptedAliasGroups.map(({ field, aliases }) => [field, [...aliases]])
) as Record<CsvField, string[]>;

const requiredFields: CsvField[] = ["date", "revenue", "impressions"];
const displayFields: CsvField[] = [
  "date",
  "appName",
  "placementName",
  "adUnit",
  "adFormat",
  "country",
  "network",
  "mediation",
  "revenue",
  "ecpm",
  "impressions",
  "requests",
  "matchedRequests",
  "fills",
  "clicks",
  "fillRate",
  "matchRate"
];

const numericFields: CsvField[] = [
  "revenue",
  "ecpm",
  "impressions",
  "requests",
  "matchedRequests",
  "fills",
  "clicks",
  "fillRate",
  "matchRate"
];

function numberValue(value: unknown) {
  const parsed = Number(String(value ?? "").replace(/[$,%]/g, "").trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeHeader(header: string) {
  return header.replace(/^\uFEFF/, "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

const aliasLookup = new Map<string, CsvField>();
for (const field of displayFields) {
  for (const alias of fieldAliases[field]) {
    aliasLookup.set(normalizeHeader(alias), field);
  }
}

export function createFieldStatuses(fieldMap?: Map<CsvField, string>): FieldStatus[] {
  return displayFields.map((field) => ({
    field,
    label: fieldLabels[field],
    required: requiredFields.includes(field),
    matchedHeader: fieldMap === undefined ? fieldLabels[field] : fieldMap.get(field)
  }));
}

function buildFieldMap(headers: string[]) {
  const fieldMap = new Map<CsvField, string>();

  for (const header of headers) {
    const field = aliasLookup.get(normalizeHeader(header));
    if (field && !fieldMap.has(field)) {
      fieldMap.set(field, header);
    }
  }

  return fieldMap;
}

function valueFrom(record: Record<CsvField, string>, field: CsvField) {
  return record[field] ?? "";
}

function detectDelimiter(headerLine: string) {
  const tabCount = headerLine.split("\t").length;
  const commaCount = headerLine.split(",").length;
  return tabCount > commaCount ? "\t" : ",";
}

function parseCsvLine(line: string, delimiter = ",") {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"') {
      if (inQuotes && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (char === delimiter && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }

  values.push(current.trim());
  return values;
}

function analyzeCsvIssues(rows: MetricRow[], fieldMap: Map<CsvField, string>): IssueKey[] {
  const issues = new Set<IssueKey>();
  const dates = new Set(rows.map((row) => row.date));
  const optionalFields: CsvField[] = ["appName", "placementName", "country", "network", "ecpm", "requests", "fills"];

  if (optionalFields.some((field) => !fieldMap.has(field))) issues.add("fallbackIssue");
  if (dates.size < 2) issues.add("twoDatesIssue");
  if (!fieldMap.has("requests") || !fieldMap.has("fills") || rows.every((row) => row.requests === 0 || row.fills === 0)) {
    issues.add("fillIssue");
  }
  if (!fieldMap.has("ecpm")) issues.add("ecpmIssue");
  if (fieldMap.has("matchRate") || fieldMap.has("matchedRequests")) issues.add("matchRateDefinitionNote");
  if (rows.some((row) => row.impressions > 0 && row.impressions < 1000)) issues.add("lowVolumeIssue");

  return [...issues];
}

export function parseCsv(text: string): ParseCsvResult {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) throw new CsvParseError("empty_file");

  const delimiter = detectDelimiter(lines[0] ?? "");
  const headers = parseCsvLine(lines[0] ?? "", delimiter).map((header) => header.trim());
  const fieldMap = buildFieldMap(headers);
  if (fieldMap.size === 0) throw new CsvParseError("unmapped_columns");

  const missingRequiredCategory = getMissingRequiredFieldCategory([...fieldMap.keys()]);
  if (missingRequiredCategory) throw new CsvParseError(missingRequiredCategory);

  const rows = lines.slice(1).map((line, index) => {
    const values = parseCsvLine(line, delimiter);
    const record = Object.fromEntries(displayFields.map((field) => [field, ""])) as Record<CsvField, string>;

    headers.forEach((header, columnIndex) => {
      const field = aliasLookup.get(normalizeHeader(header));
      if (field) record[field] = values[columnIndex] ?? "";
    });

    if (numericFields.some((field) => isInvalidNumericValue(valueFrom(record, field)))) {
      throw new CsvParseError("invalid_numeric_values");
    }

    const requests = numberValue(valueFrom(record, "requests"));
    const matchedRequests = numberValue(valueFrom(record, "matchedRequests"));
    const fills = numberValue(valueFrom(record, "fills"));
    const impressions = numberValue(valueFrom(record, "impressions"));
    const revenue = numberValue(valueFrom(record, "revenue"));
    const providedEcpm = numberValue(valueFrom(record, "ecpm"));
    const ecpm = providedEcpm || (impressions ? (revenue / impressions) * 1000 : 0);
    const providedFillRate = numberValue(valueFrom(record, "fillRate"));
    const fillRate = providedFillRate || (requests ? (fills / requests) * 100 : 0);
    const matchRate = numberValue(valueFrom(record, "matchRate"));
    const clicks = numberValue(valueFrom(record, "clicks"));

    return {
      date: String(valueFrom(record, "date") || `row-${index + 1}`),
      appId: String(valueFrom(record, "appName") || "app").toLowerCase().replace(/\s+/g, "_"),
      appName: String(valueFrom(record, "appName") || "Uploaded App"),
      placementId: String(valueFrom(record, "placementName") || valueFrom(record, "adUnit") || valueFrom(record, "adFormat") || "placement")
        .toLowerCase()
        .replace(/\s+/g, "_"),
      placementName: String(valueFrom(record, "placementName") || valueFrom(record, "adUnit") || valueFrom(record, "adFormat") || "All Placements"),
      adUnit: String(valueFrom(record, "adUnit") || "") || undefined,
      adFormat: String(valueFrom(record, "adFormat") || "") || undefined,
      country: String(valueFrom(record, "country") || "ALL"),
      network: String(valueFrom(record, "network") || "Uploaded Source"),
      mediation: String(valueFrom(record, "mediation") || "") || undefined,
      revenue,
      ecpm,
      impressions,
      requests,
      matchedRequests: fieldMap.has("matchedRequests") ? matchedRequests : undefined,
      fills,
      clicks,
      fillRate,
      matchRate: fieldMap.has("matchRate") ? matchRate : undefined,
      ctr: impressions ? (clicks / impressions) * 100 : 0
    } satisfies MetricRow;
  });

  return { rows, fields: createFieldStatuses(fieldMap), issues: analyzeCsvIssues(rows, fieldMap) };
}

export function combineCsvReports(csvReports: string[]) {
  if (csvReports.length === 0) throw new CsvParseError("empty_file");

  let canonicalHeader = "";
  const dataLines: string[] = [];
  for (const report of csvReports) {
    const lines = report.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    if (lines.length < 2) throw new CsvParseError("empty_file");
    const header = lines[0].replace(/^\uFEFF/, "");
    if (!canonicalHeader) canonicalHeader = header;
    if (normalizeHeader(header) !== normalizeHeader(canonicalHeader)) throw new CsvParseError("unmapped_columns");
    dataLines.push(...lines.slice(1));
  }

  return [canonicalHeader, ...dataLines].join("\n");
}
