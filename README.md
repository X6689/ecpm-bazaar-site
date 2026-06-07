# eCPM Bazaar

Real ad monetization data desk for TopOn API data. The first milestone is simple:
fetch real TopOn full-report data, normalize it, show developer-readable rows, and
raise useful alerts when eCPM, revenue, or fill rate drops.

## Current Demo

- Next.js app with a compact monetization dashboard.
- Demo snapshot fallback when no real TopOn data has been synced.
- TopOn full-report client with request signing.
- Local JSON snapshot storage in `data/snapshot.json`.
- Alert rules for eCPM, revenue, and fill-rate drops.

## TopOn API Key Flow

1. Log in to the TopOn / Taku dashboard.
2. Open the account menu and go to `My Account`.
3. Open the `Key` page.
4. Copy the publisher key used as `X-Up-Key`.
5. If the key or API settings are not visible, ask the TopOn account manager to enable Reporting API access.

TopOn may need a few hours after access is enabled before report data is available.

## Environment

Copy `.env.example` to `.env.local` and fill in the real values:

```bash
TOPON_PUBLISHER_KEY=
TOPON_APP_IDS=
TOPON_PLACEMENT_IDS=
TOPON_ADSOURCE_IDS=
TOPON_TIME_ZONE=UTC+8
TOPON_API_URL=https://api.toponad.net/v2/fullreport
TOPON_STARTDATE=
TOPON_ENDDATE=
ECPM_DROP_THRESHOLD=25
REVENUE_DROP_THRESHOLD=30
FILL_RATE_DROP_THRESHOLD=20
```

Only `TOPON_PUBLISHER_KEY` is required to attempt a sync. App, placement, and
ad-source filters can stay empty while validating the first account-level pull.
Use `TOPON_STARTDATE` and `TOPON_ENDDATE` as `YYYYmmdd` values when you need to
pull a known data day from the TopOn dashboard.

## Commands

```bash
npm install
npm run dev
npm run build
npm run sync:topon
```

Open the app at:

```text
http://localhost:3000
```

## Data Flow

1. `npm run sync:topon` signs and sends a TopOn full-report request.
2. The raw API response is saved to `data/last-topon-raw.json`.
3. Normalized rows are saved to `data/snapshot.json`.
4. The dashboard reads `/api/snapshot`.
5. Alerts are calculated from the latest local snapshot.

## Next Milestones

- Validate the normalized field mapping against the first real TopOn response.
- Add app and placement filters in the UI.
- Add scheduled sync and delivery channels for alerts.
- Replace local JSON with SQLite or Postgres once real data volume is known.
