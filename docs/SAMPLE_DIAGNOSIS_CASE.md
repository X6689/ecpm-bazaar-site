# Synthetic Sample Diagnosis Case

## Purpose

This case provides a public, recording-ready way to try the eCPM Bazaar diagnosis without uploading private data. It is **synthetic sample data**. It is not a customer case and must never be described as one.

## Comparison periods

- Baseline: 2026-06-01 to 2026-06-07
- Comparison: 2026-06-08 to 2026-06-14

The public files are:

- `public/demo-data/ecpm-baseline.csv`
- `public/demo-data/ecpm-comparison.csv`

The browser fetches both files, combines their report rows, and sends the combined CSV through the same parser and diagnosis path used by a normal upload.

## Data design

All rows use the fictional app name `Sample Puzzle Game`, fictional placement names, and a fictional mediation label. The data covers US, BR, IN, and DE traffic; Rewarded, Interstitial, and Banner formats; and AdMob, AppLovin, and Unity Ads sources.

The generator is `scripts/generate-synthetic-sample.ts`. It allocates period totals across segments and seven dates, then calculates each row using:

- Revenue = impressions x eCPM / 1,000
- Match rate = matched requests / requests x 100
- Show rate = impressions / matched requests x 100
- Weighted eCPM = total revenue / total impressions x 1,000

Run `npx tsx scripts/generate-synthetic-sample.ts` after changing the segment definitions. Then run the test suite. Do not edit large groups of generated rows by hand.

## Expected totals

| Metric | Baseline | Comparison | Change |
| --- | ---: | ---: | ---: |
| Revenue | $2,870 | $1,965 | -31.53% |
| Requests | 1,250,000 | 1,080,000 | -13.60% |
| Matched requests | 1,050,000 | 907,200 | -13.60% |
| Match rate | 84.0% | 84.0% | 0.00% |
| Impressions | 820,000 | 600,000 | -26.83% |
| Show rate | 78.10% | 66.14% | -15.31% |
| Weighted eCPM | $3.50 | $3.275 | -6.43% |

Supporting changes calculated from the same rows:

- US impression share: 42% to 28%
- Rewarded impressions: 360,000 to 220,000
- AppLovin impressions: 300,000 to 150,000

## Expected diagnosis

Primary finding: the revenue decline was driven mainly by fewer impressions and a lower show rate, not a broad eCPM collapse.

Supporting evidence should point to lower Rewarded delivery, traffic shifting away from the US, and a large source-level delivery loss. Recommended checks should cover placement triggers, the requests-to-matched-to-impressions funnel, session or release changes, source delivery, and country mix.

## Running the sample

Open `/demo/?sample=synthetic&compare=last-7-days` or open `/demo/` and click **Try with sample data**. The result displays a synthetic-data disclosure and an **Upload your own report** action.

For Reddit or other public demonstrations, keep the synthetic disclosure visible. Use the case only to explain the diagnostic workflow. Never imply that the data belongs to a real developer, app, or customer.
