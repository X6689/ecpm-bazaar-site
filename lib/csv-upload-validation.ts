export const csvParseErrorCategories = [
  "unsupported_file_type",
  "empty_file",
  "missing_date",
  "missing_revenue",
  "missing_impressions",
  "invalid_numeric_values",
  "insufficient_periods",
  "unmapped_columns",
  "unknown"
] as const;

export type CsvParseErrorCategory = (typeof csvParseErrorCategories)[number];

export class CsvParseError extends Error {
  constructor(public readonly category: CsvParseErrorCategory) {
    super(category);
    this.name = "CsvParseError";
  }
}

export function getMissingRequiredFieldCategory(fields: readonly string[]): CsvParseErrorCategory | null {
  if (!fields.includes("date")) return "missing_date";
  if (!fields.includes("revenue")) return "missing_revenue";
  if (!fields.includes("impressions")) return "missing_impressions";
  return null;
}

type FileLike = {
  name?: string;
  type?: string;
};

export function getUnsupportedFileType(file: FileLike) {
  const fileName = file.name?.toLowerCase() ?? "";
  const mimeType = file.type?.toLowerCase() ?? "";
  const looksLikeCsv = fileName.endsWith(".csv") || mimeType === "text/csv" || mimeType === "application/csv";

  return looksLikeCsv ? null : ("unsupported_file_type" as const);
}

export function isInvalidNumericValue(value: string) {
  const normalized = value.replace(/[$,%]/g, "").trim();
  return normalized.length > 0 && !Number.isFinite(Number(normalized));
}

export function getCsvParseErrorCategory(error: unknown): CsvParseErrorCategory {
  if (error instanceof CsvParseError) {
    return error.category;
  }

  return "unknown";
}
