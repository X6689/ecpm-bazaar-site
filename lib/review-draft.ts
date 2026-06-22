export const demoReviewDraftStorageKey = "ecpm-bazaar-demo-review-draft";

export type DemoReviewDraft = {
  version: 1;
  createdAt: string;
  sourceLabel: string;
  comparisonMode: "latest-day" | "last-7-days";
  rowCount: number;
  truncated: boolean;
  changeIndex: number;
  periodIndex: number;
  diagnosisText: string;
  dataSample: string;
};

export function parseDemoReviewDraft(value: string | null): DemoReviewDraft | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as Partial<DemoReviewDraft>;
    if (
      parsed.version !== 1 ||
      typeof parsed.createdAt !== "string" ||
      typeof parsed.sourceLabel !== "string" ||
      (parsed.comparisonMode !== "latest-day" && parsed.comparisonMode !== "last-7-days") ||
      typeof parsed.rowCount !== "number" ||
      typeof parsed.truncated !== "boolean" ||
      typeof parsed.changeIndex !== "number" ||
      typeof parsed.periodIndex !== "number" ||
      typeof parsed.diagnosisText !== "string" ||
      typeof parsed.dataSample !== "string"
    ) {
      return null;
    }

    return parsed as DemoReviewDraft;
  } catch {
    return null;
  }
}
