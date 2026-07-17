import type { CsvParseErrorCategory } from "./csv-upload-validation";

export type RowCountBucket = "1-10" | "11-50" | "51-200" | "201-1000" | "1000+";
export type MissingRequiredFieldCount = "0" | "1" | "2" | "3+";
export type ValidationEventName =
  | "sample_demo_started"
  | "csv_upload_started"
  | "csv_parse_success"
  | "csv_parse_failed"
  | "diagnosis_result_viewed"
  | "free_diagnosis_clicked"
  | "diagnosis_form_started"
  | "email_draft_generated"
  | "template_downloaded"
  | "case_demo_started"
  | "diagnosis_feedback_recorded";

type SharedProperties = {
  page_path?: string;
  source_cta?: string;
};

export type ValidationEventProperties = {
  sample_demo_started: SharedProperties & { comparison_period?: "latest-day" | "last-7-days"; sample_type?: "default" | "14-day" };
  csv_upload_started: SharedProperties & { input_source?: "file" | "paste" };
  csv_parse_success: SharedProperties & {
    row_count_bucket?: RowCountBucket;
    detected_column_count?: number;
    missing_required_field_count?: MissingRequiredFieldCount;
  };
  csv_parse_failed: SharedProperties & { parse_error_category?: CsvParseErrorCategory; input_source?: "file" | "paste" };
  diagnosis_result_viewed: SharedProperties & {
    comparison_period?: "latest-day" | "last-7-days";
    row_count_bucket?: RowCountBucket;
    case_type?: string;
  };
  free_diagnosis_clicked: SharedProperties;
  diagnosis_form_started: SharedProperties & { form_source?: "direct" | "case" | "sample" | "demo-draft" };
  email_draft_generated: SharedProperties & { form_source?: "direct" | "case" | "sample" | "demo-draft" };
  template_downloaded: SharedProperties & { template_type?: "admob" | "applovin-max" | "levelplay-topon" | "14-day-sample" };
  case_demo_started: SharedProperties & { case_type?: string };
  diagnosis_feedback_recorded: SharedProperties & {
    usefulness?: "yes" | "no" | "not-sure";
    driver_clarity?: "clear" | "partly-clear" | "unclear";
    next_check?: "impressions" | "match-fill" | "country-mix" | "placement" | "ad-source" | "time-of-day" | "ecpm" | "not-sure";
  };
};

type SafeEventProperties = Record<string, string | number | undefined>;

const allowedProperties: Record<ValidationEventName, readonly string[]> = {
  sample_demo_started: ["page_path", "source_cta", "comparison_period", "sample_type"],
  csv_upload_started: ["page_path", "source_cta", "input_source"],
  csv_parse_success: ["page_path", "source_cta", "row_count_bucket", "detected_column_count", "missing_required_field_count"],
  csv_parse_failed: ["page_path", "source_cta", "parse_error_category", "input_source"],
  diagnosis_result_viewed: ["page_path", "source_cta", "comparison_period", "row_count_bucket", "case_type"],
  free_diagnosis_clicked: ["page_path", "source_cta"],
  diagnosis_form_started: ["page_path", "source_cta", "form_source"],
  email_draft_generated: ["page_path", "source_cta", "form_source"],
  template_downloaded: ["page_path", "source_cta", "template_type"],
  case_demo_started: ["page_path", "source_cta", "case_type"],
  diagnosis_feedback_recorded: ["page_path", "source_cta", "usefulness", "driver_clarity", "next_check"]
};

declare global {
  interface Window {
    __ecpmBazaarTrackValidationEvent__?: (event: ValidationEventName, properties: SafeEventProperties) => void;
  }
}

export function rowCountBucket(rowCount: number): RowCountBucket {
  if (rowCount <= 10) return "1-10";
  if (rowCount <= 50) return "11-50";
  if (rowCount <= 200) return "51-200";
  if (rowCount <= 1000) return "201-1000";
  return "1000+";
}

export function missingRequiredFieldCount(missingCount: number): MissingRequiredFieldCount {
  if (missingCount <= 0) return "0";
  if (missingCount === 1) return "1";
  if (missingCount === 2) return "2";
  return "3+";
}

export function sanitizeValidationEvent<T extends ValidationEventName>(
  event: T,
  properties: ValidationEventProperties[T]
): SafeEventProperties {
  const safeProperties: SafeEventProperties = {};

  for (const key of allowedProperties[event]) {
    const value = (properties as Record<string, unknown>)[key];
    if (typeof value === "string" || typeof value === "number") {
      safeProperties[key] = value;
    }
  }

  return safeProperties;
}

export function trackEvent<T extends ValidationEventName>(event: T, properties: ValidationEventProperties[T] = {} as ValidationEventProperties[T]) {
  if (typeof window === "undefined") {
    return;
  }

  window.__ecpmBazaarTrackValidationEvent__?.(event, sanitizeValidationEvent(event, properties));
}
