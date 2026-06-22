"use client";

import { useState } from "react";
import { CheckCircle2, Copy, Mail, Send } from "lucide-react";
import { writeClipboardText } from "@/lib/clipboard";

type CopyEmailPanelProps = {
  body: string;
  fieldList: string;
  mailto: string;
};

const contactEmail = "xmmyy168@gmail.com";

const platformOptions = ["AdMob", "AppLovin MAX", "Unity LevelPlay", "TopOn", "Other"];
const changeOptions = ["Revenue drop", "eCPM drop", "Fill rate drop", "Impressions drop", "Country mix change", "Ad source change"];
const periodOptions = ["Latest day vs previous day", "Last 7 days vs previous 7 days", "Custom period"];

function trimOrFallback(value: string, fallback: string) {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

export function CopyEmailPanel({ body, fieldList, mailto }: CopyEmailPanelProps) {
  const [copied, setCopied] = useState<"request" | "body" | "fields" | null>(null);
  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState(platformOptions[0]);
  const [changeType, setChangeType] = useState(changeOptions[0]);
  const [period, setPeriod] = useState(periodOptions[0]);
  const [notes, setNotes] = useState("");
  const [dataSample, setDataSample] = useState("");
  const [openedDraft, setOpenedDraft] = useState(false);

  const diagnosisRequest = [
    "Hi eCPM Bazaar,",
    "",
    "I would like a free ad revenue change diagnosis.",
    "",
    `My contact email: ${trimOrFallback(email, "[your email]")}`,
    `Platform: ${platform}`,
    `Main change: ${changeType}`,
    `Comparison period: ${period}`,
    "Preferred output: diagnosis card + paste-ready short report",
    "",
    "Context / question:",
    trimOrFallback(notes, "[briefly describe what changed and what you already checked]"),
    "",
    "Anonymized data rows or column notes:",
    trimOrFallback(dataSample, `[paste rows with fields: ${fieldList}]`),
    "",
    "I will not send login credentials, API keys, private account IDs, or non-anonymized user data."
  ].join("\n");

  const diagnosisMailto = `mailto:${contactEmail}?subject=${encodeURIComponent("Free eCPM Bazaar diagnosis request")}&body=${encodeURIComponent(
    diagnosisRequest
  )}`;

  async function copyText(kind: "request" | "body" | "fields", text: string) {
    if (await writeClipboardText(text)) {
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 1600);
    } else {
      setCopied(null);
    }
  }

  function openDraft() {
    setOpenedDraft(true);
    window.location.href = diagnosisMailto;
  }

  return (
    <div className="copy-panel">
      <form
        className="diagnosis-request-form"
        onSubmit={(event) => {
          event.preventDefault();
          openDraft();
        }}
      >
        <div className="form-grid">
          <label>
            <span>Your email</span>
            <input
              autoComplete="email"
              inputMode="email"
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label>
            <span>Ad platform</span>
            <select value={platform} onChange={(event) => setPlatform(event.target.value)}>
              {platformOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Main change</span>
            <select value={changeType} onChange={(event) => setChangeType(event.target.value)}>
              {changeOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Comparison period</span>
            <select value={period} onChange={(event) => setPeriod(event.target.value)}>
              {periodOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="form-wide">
          <span>What changed?</span>
          <textarea
            placeholder="Example: US rewarded video revenue dropped yesterday, but impressions were almost stable."
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </label>

        <label className="form-wide">
          <span>Anonymized rows or field notes</span>
          <textarea
            placeholder={`date,appName,placementName,country,network,revenue,ecpm,impressions,requests,fills,clicks\n2026-06-14,Game A,Rewarded Home,US,AdMob,128.42,18.70,6868,9200,7100,318`}
            value={dataSample}
            onChange={(event) => setDataSample(event.target.value)}
          />
        </label>

        <div className="form-footer">
          <button className="primary-action" type="submit">
            <Send size={18} aria-hidden="true" />
            Generate email draft
          </button>
          <p>
            The form runs in your browser and opens your email app. No account credentials, API keys, or private user data.
          </p>
        </div>
        {openedDraft ? <p className="form-status">Email draft opened. If nothing appeared, copy the generated request below.</p> : null}
      </form>

      <div className="copy-actions">
        <a className="primary-action" href={mailto}>
          <Mail size={18} aria-hidden="true" />
          Open starter draft
        </a>
        <button className="copy-action-button" type="button" onClick={() => copyText("request", diagnosisRequest)}>
          {copied === "request" ? <CheckCircle2 size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
          {copied === "request" ? "Copied request" : "Copy generated request"}
        </button>
        <button className="copy-action-button" type="button" onClick={() => copyText("body", body)}>
          {copied === "body" ? <CheckCircle2 size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
          {copied === "body" ? "Copied template" : "Copy email template"}
        </button>
        <button className="copy-action-button" type="button" onClick={() => copyText("fields", fieldList)}>
          {copied === "fields" ? <CheckCircle2 size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
          {copied === "fields" ? "Copied fields" : "Copy field list"}
        </button>
      </div>
      <pre className="email-template">{diagnosisRequest}</pre>
    </div>
  );
}
