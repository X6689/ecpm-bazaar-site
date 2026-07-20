import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import {
  CsvParseError,
  getCsvParseErrorCategory,
  getMissingRequiredFieldCategory,
  getUnsupportedFileType,
  isInvalidNumericValue
} from "../lib/csv-upload-validation";
import { sanitizeValidationEvent } from "../lib/validation-events";

const projectRoot = process.cwd();

function sourceFiles(relativeDirectory: string): string[] {
  const directory = join(projectRoot, relativeDirectory);

  return readdirSync(directory).flatMap((entry) => {
    const relativePath = join(relativeDirectory, entry);
    const absolutePath = join(projectRoot, relativePath);
    return statSync(absolutePath).isDirectory() ? sourceFiles(relativePath) : [relativePath];
  });
}

function publicSourceText() {
  return ["app", "lib", "public"]
    .flatMap(sourceFiles)
    .filter((relativePath) => !relativePath.includes("node_modules"))
    .map((relativePath) => `${relativePath}\n${readFileSync(join(projectRoot, relativePath), "utf8")}`)
    .join("\n");
}

test("public source has no legacy contact email", () => {
  const source = publicSourceText();
  const legacyContactEmails = ["xmmyy168", "xmmyy1688"].map((localPart) => `${localPart}@gmail.com`);

  for (const legacyEmail of legacyContactEmails) {
    assert.equal(source.includes(legacyEmail), false);
  }
  assert.equal(source.includes("xia.business.systems@gmail.com"), true);
});

test("validation event sanitizer removes sensitive fields", () => {
  const sanitized = sanitizeValidationEvent(
    "csv_parse_success",
    {
      page_path: "/demo/",
      row_count_bucket: "11-50",
      detected_column_count: 9,
      missing_required_field_count: "0",
      email: "developer@example.com",
      file_name: "private-report.csv",
      csv: "date,revenue,impressions",
      app_name: "Private App"
    } as never
  );

  assert.deepEqual(sanitized, {
    page_path: "/demo/",
    row_count_bucket: "11-50",
    detected_column_count: 9,
    missing_required_field_count: "0"
  });
});

test("CSV validation exposes stable, useful error categories", () => {
  assert.equal(getUnsupportedFileType({ name: "report.xlsx", type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), "unsupported_file_type");
  assert.equal(getUnsupportedFileType({ name: "report.csv", type: "text/csv" }), null);
  assert.equal(getMissingRequiredFieldCategory(["date", "revenue"]), "missing_impressions");
  assert.equal(getMissingRequiredFieldCategory(["date", "revenue", "impressions"]), null);
  assert.equal(isInvalidNumericValue("$4.20"), false);
  assert.equal(isInvalidNumericValue("not-a-number"), true);
  assert.equal(getCsvParseErrorCategory(new CsvParseError("missing_date")), "missing_date");
  assert.equal(getCsvParseErrorCategory(new Error("unclassified")), "unknown");
});

test("legacy handwritten resource order data is not reintroduced", () => {
  const home = readFileSync(join(projectRoot, "app/page.tsx"), "utf8");
  const method = readFileSync(join(projectRoot, "app/method/method-content.tsx"), "utf8");

  assert.equal(home.includes("resourceOrder"), false);
  assert.doesNotMatch(method, /order:\s*\[/);
});

test("public capability copy only promises sample data and CSV", () => {
  const home = readFileSync(join(projectRoot, "app/page.tsx"), "utf8");
  const faq = readFileSync(join(projectRoot, "app/faq/faq-content.tsx"), "utf8");
  const templates = readFileSync(join(projectRoot, "app/templates/templates-content.tsx"), "utf8");

  assert.doesNotMatch(home, new RegExp("CSV\\s*/\\s*Excel\\s*/\\s*API", "i"));
  assert.doesNotMatch(home, /Import data/i);
  assert.doesNotMatch(templates, /Excel import/i);
  assert.match(faq, /supports only sample data and anonymized CSV rows/i);
  assert.match(faq, /automatic sync are not available/i);
});
