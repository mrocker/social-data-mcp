---
name: linkedin-company-profile
description: Look up LinkedIn companies (industry, size, HQ, website, followers, employees on LinkedIn, founded, specialties, latest job openings) and public LinkedIn profiles (name, headline, current titles and companies, location, education, past organizations, followers) by URL or name — without logging in. Use for company enrichment, hiring signals, and checking who someone is professionally.
---

# LinkedIn companies & public profiles

Pay-per-result Apify Actor `nick.cheng/linkedin-company-profile-scraper`. **No login, no cookies, no account.**
$0.004 per company, $0.004 per profile — same on every plan; not-found or non-public targets cost nothing.
Needs `APIFY_TOKEN` (free account: https://console.apify.com/account/integrations).

## When to use

- "What does this company do / how big is it / where is it" → `companyUrls` (links or the name from the link)
- "Is this company hiring, and for what" → add `includeJobs: true` (newest open roles, last 30 days first)
- "Who is this person professionally" → `profileUrls` (public profiles only)
- Long lists → `listUrl` (public CSV/TXT or a Google Sheet shared as "Anyone with the link")

## Call it

```bash
curl -s -X POST "https://api.apify.com/v2/acts/nick.cheng~linkedin-company-profile-scraper/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"companyUrls":["stripe","https://www.linkedin.com/company/duolingo/"],"includeJobs":true,"profileUrls":["williamhgates"]}'
```

Or as an MCP tool: `https://mcp.apify.com/?tools=nick.cheng/linkedin-company-profile-scraper`.
Companies only: `nick.cheng/linkedin-company-scraper`; profiles only: `nick.cheng/linkedin-profile-scraper`.

## Output rows

- `itemType: "company"` — `companyId`, `slug`, `name`, `tagline`, `description`, `website`, `industry`, `companySize`,
  `employeesOnLinkedIn`, `followers`, `headquarters`, `companyType`, `founded`, `specialties`, `logo`;
  with `includeJobs`: `latestJobs[]` (`title`, `location`, `postedAt`, `url`), `latestJobsWindow`
- `itemType: "profile"` — `name`, `headline`, `jobTitles`, `currentCompanies[]` (`name`, `title`, `startDate`),
  `location`, `countryCode`, `about`, `followers`, `connections`, `education[]`, `pastOrganizations[]`, `languages`, `awards`
- `error: true, chargedForThis: false` — not found, or not visible to logged-out visitors

## Limits

Only what LinkedIn shows logged-out visitors. No people/company search, no employee lists, no Sales Navigator,
no emails or phone numbers. Profiles are personal data: the caller needs a lawful basis (GDPR/CCPA) to collect and use them.
