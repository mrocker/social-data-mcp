---
name: tiktok-profile-stats
description: Fetch TikTok account profiles (follower count, likes, video count, bio, verification, account age, business flags) by handle or URL, and per-video stats (plays, likes, comments, shares, saves) by video URL or ID — without login, cookies or signature hacks. Use when a task needs real TikTok numbers.
---

# TikTok profiles & video stats

Pay-per-result Apify Actor `nick.cheng/tiktok-profile-stats-scraper`. No login, no cookies, no
signature reverse-engineering. Charges only for rows that came back ($0.02/profile, $0.01/video —
same on every plan). Needs `APIFY_TOKEN` (free account: https://console.apify.com/account/integrations).

## When to use

- "How many followers does @handle have / is it verified / how old is the account" → `handles`
- "Stats for these video links" → `videoUrls` (full links, `vm.tiktok.com` share links, or bare IDs)
- Creator vetting: `isBusinessAccount`, `businessCategory`, `duetSetting`, `stitchSetting`, `createdAt`

## Call it

```bash
curl -s -X POST "https://api.apify.com/v2/acts/nick.cheng~tiktok-profile-stats-scraper/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"handles":["nasa","duolingo"],"videoUrls":["https://www.tiktok.com/@nasa/video/7676868860749827342"]}'
```

Or as an MCP tool: `https://mcp.apify.com/?tools=nick.cheng/tiktok-profile-stats-scraper`.

## Output rows

- `itemType: "profile"` — `handle`, `userId`, `secUid` (stable ID), `nickname`, `bio`, `bioLink`,
  `isVerified`, `isPrivate`, `createdAt`, `followers`, `following`, `likes`, `videoCount`,
  `isBusinessAccount`, `businessCategory`, `commentSetting`, `duetSetting`, `stitchSetting`
- `itemType: "video"` — `videoId`, `url`, `description`, `createdAt`, `durationSeconds`, `playCount`,
  `likeCount`, `commentCount`, `shareCount`, `collectCount`, `repostCount`, `hashtags`, `music`,
  `author` (creator's headline counts), `isAd`, `isPhotoPost`
- `error: true, chargedForThis: false` — account/video not found, reason given

## Limits

No video list for an account (TikTok does not render it to logged-out clients — you supply video
links), no comments, no search, no hashtag pages, no media download URLs.
