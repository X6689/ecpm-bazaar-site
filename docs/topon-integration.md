# TopOn Integration Notes

## Request

Endpoint:

```text
POST https://api.toponad.net/v2/fullreport
```

Headers:

```text
Content-Type: application/json
Content-MD5: MD5(body).toUpperCase()
X-Up-Key: publisher key
X-Up-Timestamp: Unix timestamp in milliseconds
X-Up-Signature: request signature
```

The current client lives in `lib/topon.ts`.

## Normalization Contract

The dashboard expects rows shaped like:

```ts
{
  date: string;
  appId: string;
  appName: string;
  placementId: string;
  placementName: string;
  country: string;
  network: string;
  revenue: number;
  ecpm: number;
  impressions: number;
  requests: number;
  fills: number;
  clicks: number;
  fillRate: number;
  ctr: number;
}
```

The first real TopOn response should be checked against `normalizeTopOnReport`.
If TopOn uses account-specific field names, update that function only and keep
the UI contract stable.

## Alert Rules

Alert thresholds are percent drops versus the previous matching row:

- Same app
- Same placement
- Same country
- Earlier date

Environment defaults:

```text
ECPM_DROP_THRESHOLD=25
REVENUE_DROP_THRESHOLD=30
FILL_RATE_DROP_THRESHOLD=20
```
