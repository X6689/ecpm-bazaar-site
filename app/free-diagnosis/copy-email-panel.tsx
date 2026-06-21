"use client";

import { useState } from "react";
import { CheckCircle2, Copy, Mail } from "lucide-react";

type CopyEmailPanelProps = {
  body: string;
  fieldList: string;
  mailto: string;
};

export function CopyEmailPanel({ body, fieldList, mailto }: CopyEmailPanelProps) {
  const [copied, setCopied] = useState<"body" | "fields" | null>(null);

  async function copyText(kind: "body" | "fields", text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      setCopied(null);
    }
  }

  return (
    <div className="copy-panel">
      <div className="copy-actions">
        <a className="primary-action" href={mailto}>
          <Mail size={18} aria-hidden="true" />
          Open email draft
        </a>
        <button className="copy-action-button" type="button" onClick={() => copyText("body", body)}>
          {copied === "body" ? <CheckCircle2 size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
          {copied === "body" ? "Copied template" : "Copy email template"}
        </button>
        <button className="copy-action-button" type="button" onClick={() => copyText("fields", fieldList)}>
          {copied === "fields" ? <CheckCircle2 size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
          {copied === "fields" ? "Copied fields" : "Copy field list"}
        </button>
      </div>
      <pre className="email-template">{body}</pre>
    </div>
  );
}
