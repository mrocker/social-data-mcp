---
name: tiktok-profile-stats
description: Fetch TikTok account profiles (follower count, likes, video count, bio, verification, account age, business flags) by handle or URL, and per-video stats (plays, likes, comments, shares, saves) and optional transcripts by video URL or ID — without login, cookies or signature hacks. Use when a task needs real TikTok numbers or what a video says.
---

# TikTok profiles & video stats

Pay-per-result Apify Actor `nick.cheng/tiktok-profile-stats-scraper`. No login, no cookies, no
signature reverse-engineering. Charges only for rows that came back ($0.02/profile, $0.01/video —
same on every plan). Needs `APIFY_TOKEN` (free account: https://console.apify.com/account/integrations).

## When to use

- "How many followers does @handle have / is it verified / how old is the account" → `handles`
- "Stats for these video links" → `videoUrls` (full links, `vm.tiktok.com` share links, or bare IDs)
- Creator vetting: `isBusinessAccount`, `businessCategory`, `duetSetting`, `stitchSetting`, `createdAt`
- "How do this creator's recent videos perform" → add `recentVideos: 8` (1–12): per-video counts plus `recentStats`
  (avg/median plays, engagement rate by plays and by followers, posts per week; pinned videos kept out of the averages)
- "How do I contact them" → every profile row has `emails`, `phones`, `externalLinks`, `linkInBio`, `otherSocials`
  parsed from the bio (only what the creator published)
- "Stats and what is said in these videos" → add `includeSubtitles: true` (no extra charge). Transcripts only:
  `nick.cheng/tiktok-transcript-scraper` ($0.003 per transcript; see the `tiktok-transcripts` skill)

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
  `isBusinessAccount`, `businessCategory`, `commentSetting`, `duetSetting`, `stitchSetting`,
  `emails`, `phones`, `externalLinks`, `linkInBio`, `otherSocials`; with `recentVideos` also `recentVideos[]`, `recentStats`
- `itemType: "video"` — `videoId`, `url`, `description`, `createdAt`, `durationSeconds`, `playCount`,
  `likeCount`, `commentCount`, `shareCount`, `collectCount`, `repostCount`, `hashtags`, `music`,
  `author` (creator's headline counts), `isAd`, `isPhotoPost`; with `includeSubtitles` also `transcript`,
  `transcriptLanguage`, `transcriptType`, `subtitles[].segments` (`{start, end, text}`), `subtitlesNote`
- `error: true, chargedForThis: false` — account/video not found, reason given

## Limits

No full video list for an account (`recentVideos` covers the latest ~10–12 shown on the creator's
public embed; otherwise you supply video links), no comments, no search, no hashtag pages, no media
download URLs, no hidden contact details.
