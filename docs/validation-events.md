# Validation Events

## Current state

eCPM Bazaar does not currently load a third-party analytics SDK or send validation events to a server. The `trackEvent()` helper is intentionally a provider-agnostic no-op until a privacy-reviewed provider is configured.

## Events wired in the product

- `sample_demo_started`
- `csv_upload_started`
- `csv_parse_success`
- `csv_parse_failed`
- `diagnosis_result_viewed`
- `free_diagnosis_clicked`
- `diagnosis_form_started`
- `email_draft_generated`
- `template_downloaded`
- `case_demo_started`
- `diagnosis_feedback_recorded`

## Allowed properties

Only low-cardinality interaction context is allowed:

- `page_path`
- `source_cta`
- `comparison_period`
- `row_count_bucket`
- `detected_column_count`
- `missing_required_field_count`
- `parse_error_category`
- `case_type`
- `template_type`
- feedback option values

Never pass CSV text, file names, email addresses, app names, package names, placement names, ad-unit IDs, account IDs, exact revenue, exact DAU, free-text notes, or user-level data.

## Future provider hookup

After privacy review, a single provider can attach a browser callback before product interactions:

```ts
window.__ecpmBazaarTrackValidationEvent__ = (event, properties) => {
  // Send only the already-sanitized event and properties to the approved provider.
};
```

Do not add a second analytics SDK or bypass `sanitizeValidationEvent()`.
