---
name: tiktok-transcripts
description: Get TikTok video transcripts (TikTok's own captions) as plain text plus timed segments, with language, author and caption, from video links, share links or IDs — without login or cookies. Use when a task needs what a TikTok video says — summaries, content analysis, search.
---

# TikTok transcripts

Pay-per-result Apify Actor `nick.cheng/tiktok-transcript-scraper`. No login, no cookies.
**$0.003 per transcript delivered, same on every Apify plan; videos without captions cost nothing.**
Needs `APIFY_TOKEN` (free account: https://console.apify.com/account/integrations).

## When to use

- "What is said in these TikToks" → `videoUrls` (full links, `vm.tiktok.com` share links, or bare IDs)
- A long list in a sheet → `listUrl` (public CSV/TXT or a Google Sheet shared as "Anyone with the link")

## Call it

```bash
curl -s -X POST "https://api.apify.com/v2/acts/nick.cheng~tiktok-transcript-scraper/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"videoUrls":["https://www.tiktok.com/@nasa/video/7667244788046892319"]}'
```

Or as an MCP tool: `https://mcp.apify.com/?tools=nick.cheng/tiktok-transcript-scraper`.

## Output rows

- `itemType: "transcript"` — `videoId`, `url`, `authorHandle`, `authorNickname`, `description`, `createdAt`,
  `durationSeconds`, `transcriptLanguage`, `transcriptType` (`auto-generated` / `machine-translated`),
  `transcript` (one string), `subtitles[].segments` (`{start, end, text}` in seconds), `inputOrder`
- `error: true, chargedForThis: false` — no captions, photo post, or deleted/private video; reason given

## Limits

TikTok's own captions only — no speech recognition of its own; music-only clips and videos without
speech usually have none (no charge). TikTok's language detection is occasionally wrong — check
`transcriptLanguage`. No video lists per account: you supply the links. For play/like counts use
`nick.cheng/tiktok-profile-stats-scraper` (skill `tiktok-profile-stats`), which can include the transcript too.
