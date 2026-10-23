# Optional future n8n pipeline

The website needs no n8n, Docker, API key, subscription or running database. Keep automation off until publishing manually is comfortable.

A safe future workflow is: Manual Trigger → topic brief → optional local language model → write a draft JSON file → human editorial review → manually merge into `content/guides.json` → build → check → deploy.

Use the same guide schema as `content/guides.json`: slug, title, category, time, summary, intro, sections (heading/text), checklist, tradeoff. The homepage and guide index use the full guide collection. Category options are deduplicated and card artwork cycles automatically. Do not auto-merge untrusted model output or auto-publish drafts.

For local generation on 16 GB RAM, start with a small quantised model and one job at a time; exact performance depends on hardware and model. Local execution has electricity and storage costs. No cloud AI subscription is included or needed. Self-hosted n8n can be added later; read its current installation and security documentation first. Bind it only to localhost, retain authentication, and keep credentials outside this project. Never expose an unauthenticated webhook.

The public website must never call a local n8n webhook from visitor browsers or embed API credentials. Automation belongs on the editor's machine, outside `dist/`. A static page cannot run scheduled jobs after your PC shuts down.

Draft brief: “Explain shopping criteria for [topic]. Do not invent hands-on experience, products, prices, specifications, customer opinions, ratings, certifications or sources. Mark claims requiring verification. Include reasons not to buy. Output a draft for human review.”

Review every factual claim against manufacturer documentation; preserve source notes separately; add an actual review date only after review. Approval of a draft does not enable affiliate links: those require their own configuration and program approval.
