---
name: youtube-video-channel
description: Fetch YouTube video metadata (views, duration, publish date, category, keywords, caption languages) and channel data (subscribers, recent videos) by URL, ID or @handle without a YouTube Data API key or quota. Use when a task needs real YouTube numbers.
---

# YouTube videos & channels

Pay-per-result Apify Actor `nick.cheng/youtube-video-channel-scraper`. No API key, no OAuth, no
quota. Charges only for rows that came back ($0.015/video, $0.005/channel — same on every plan).
Needs `APIFY_TOKEN` (free account: https://console.apify.com/account/integrations).

## When to use

- "Stats for these video links" → `videoUrls`
- "Latest videos from these channels" → `channelUrls` + `maxVideosPerChannel`
- "Subscriber count only" → `channelUrls` + `maxVideosPerChannel: 0`
- "Only videos over N views / longer than M seconds / with a word in the title" → `minViews`,
  `minDurationSeconds`, `maxDurationSeconds`, `publishedAfter`, `titleContains` (screened before the
  page is fetched; filtered videos are not charged)

## Call it

```bash
curl -s -X POST "https://api.apify.com/v2/acts/nick.cheng~youtube-video-channel-scraper/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"channelUrls":["@NASA"],"maxVideosPerChannel":5,"minViews":100000}'
```

Or as an MCP tool: `https://mcp.apify.com/?tools=nick.cheng/youtube-video-channel-scraper`.

## Output rows

- `itemType: "video"` — `videoId`, `url`, `title`, `description`, `durationSeconds`, `viewCount`,
  `likesLabel` (YouTube's rounded label; exact likes are not exposed to logged-out clients),
  `publishedAt`, `channelId`, `channelName`, `keywords`, `category`, `availableCaptions`
- `itemType: "channel"` — `channelId`, `channelName`, `handle`, `subscribersLabel`, `videoCountLabel`,
  `description`, `keywords`
- `error: true, chargedForThis: false` — unavailable video/channel, reason given

## Limits

No transcripts/subtitle text (proof-of-origin gated; not attempted), no comments, no search,
channel listing is the ~30 most recent uploads only.
