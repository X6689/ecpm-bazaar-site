"use client";

import { type KeyboardEvent, useId, useRef, useState } from "react";
import { CaseMiniChart } from "./diagnosis-visuals";

type SignalKey = "Traffic" | "Fill" | "GEO" | "Placement" | "Source" | "Pricing" | "Timing";

const details: Record<SignalKey, { title: string; summary: string; example: string; check: string; chart: "pricing" | "fill" | "geo" | "timing" }> = {
  Traffic: {
    title: "Traffic and exposure",
    summary: "Impressions and impressions per active user show whether exposure dropped before pricing did.",
    example: "Revenue fell while eCPM stayed normal because fewer sessions reached the rewarded placement.",
    check: "Compare DAU, sessions, requests, and impressions per session.",
    chart: "timing"
  },
  Fill: {
    title: "Requests, matches and fills",
    summary: "Requests, matched requests, fills, and show rate help separate availability from exposure.",
    example: "Requests stayed stable, but fills fell in US rewarded traffic.",
    check: "Compare app-level serving, then split by country, format, and source.",
    chart: "fill"
  },
  GEO: {
    title: "Country mix",
    summary: "A larger share of lower-value GEO impressions can lower blended eCPM even when Tier 1 pricing is stable.",
    example: "US eCPM was stable while BR and IN gained impression share.",
    check: "Compare country impression share, country eCPM, and revenue contribution.",
    chart: "geo"
  },
  Placement: {
    title: "Placement and ad unit",
    summary: "Formats and placements can move independently; a global average can hide one affected placement.",
    example: "Rewarded exposure fell after a release while interstitial metrics were unchanged.",
    check: "Split by format, placement, ad unit, and app version.",
    chart: "timing"
  },
  Source: {
    title: "Ad source and mediation",
    summary: "One bidder or waterfall source can lose volume while total eCPM hides the change.",
    example: "A source stopped winning on Android without a matching iOS change.",
    check: "Compare source contribution, availability, configuration, and country coverage.",
    chart: "fill"
  },
  Pricing: {
    title: "Weighted eCPM",
    summary: "Pricing becomes meaningful after traffic composition and fill have been separated.",
    example: "Impressions and fill were stable, but rewarded eCPM declined in the same GEO.",
    check: "Compare weighted eCPM by country, format, source, and matching period.",
    chart: "pricing"
  },
  Timing: {
    title: "Time and external events",
    summary: "Peak-hour behavior, holidays, and live events can reduce impressions without an ad-stack issue.",
    example: "Peak-hour impressions fell during a live event while fill and eCPM were steady.",
    check: "Compare affected hours with nearby normal hours before changing settings.",
    chart: "timing"
  }
};

export function SignalTabs({ lang = "en" }: { lang?: "en" | "zh" }) {
  const [active, setActive] = useState<SignalKey>("Traffic");
  const id = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const signalKeys = Object.keys(details) as SignalKey[];
  const item = details[active];
  const labels: Record<SignalKey, string> = lang === "zh"
    ? { Traffic: "流量", Fill: "填充", GEO: "GEO", Placement: "广告位", Source: "广告源", Pricing: "定价", Timing: "时段" }
    : { Traffic: "Traffic", Fill: "Fill", GEO: "GEO", Placement: "Placement", Source: "Source", Pricing: "Pricing", Timing: "Timing" };
  const strings = lang === "zh"
    ? { example: "典型异常", check: "下一步检查", chart: "方向性样例" }
    : { example: "Typical anomaly", check: "Next check", chart: "Directional sample" };

  function moveFocus(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const keyToIndex: Record<string, number> = {
      ArrowLeft: (index - 1 + signalKeys.length) % signalKeys.length,
      ArrowRight: (index + 1) % signalKeys.length,
      Home: 0,
      End: signalKeys.length - 1
    };
    const nextIndex = keyToIndex[event.key];

    if (nextIndex === undefined) return;

    event.preventDefault();
    setActive(signalKeys[nextIndex]);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div className="signal-navigator">
      <div aria-label={lang === "zh" ? "诊断信号" : "Diagnosis signals"} aria-orientation="horizontal" className="signal-tab-list" role="tablist">
        {signalKeys.map((key, index) => (
          <button
            aria-controls={`${id}-${key}`}
            aria-selected={active === key}
            className={active === key ? "is-active" : ""}
            id={`${id}-tab-${key}`}
            key={key}
            onClick={() => setActive(key)}
            onKeyDown={(event) => moveFocus(event, index)}
            ref={(element) => { tabRefs.current[index] = element; }}
            role="tab"
            tabIndex={active === key ? 0 : -1}
            type="button"
          >
            {labels[key]}
          </button>
        ))}
      </div>
      <div aria-labelledby={`${id}-tab-${active}`} className="signal-tab-panel" id={`${id}-${active}`} role="tabpanel">
        <div>
          <p className="panel-kicker">{labels[active]}</p>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
          <dl>
            <div>
              <dt>{strings.example}</dt>
              <dd>{item.example}</dd>
            </div>
            <div>
              <dt>{strings.check}</dt>
              <dd>{item.check}</dd>
            </div>
          </dl>
        </div>
        <CaseMiniChart type={item.chart} label={strings.chart} />
      </div>
    </div>
  );
}
