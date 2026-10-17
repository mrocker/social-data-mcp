---
name: youtube-transcripts
description: Get YouTube video transcripts (the captions in the spoken language — human-written when available, else auto-generated, de-duplicated) as plain text plus timed segments, from video links, IDs or a channel's latest uploads, without a YouTube API key. Use when a task needs what a YouTube video says — summaries, quotes, RAG, search.
---

# YouTube transcripts

Pay-per-result Apify Actor `nick.cheng/youtube-transcript-scraper`. No API key, no login.
**$0.005 per transcript delivered, same on every Apify plan; videos without captions cost nothing.**
Needs `APIFY_TOKEN` (free account: https://console.apify.com/account/integrations).

## When to use

- "What does this video say / summarize it / quote the part about X" → `videoUrls`
- "Transcripts of a channel's latest uploads" → `channelUrls` + `maxVideosPerChannel`
- Skip what you do not need before paying: `minDurationSeconds: 61` (drops Shorts), `minViews`, `titleContains`

## Call it

```bash
curl -s -X POST "https://api.apify.com/v2/acts/nick.cheng~youtube-transcript-scraper/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"videoUrls":["https://www.youtube.com/watch?v=aircAruvnKk"]}'
```

Or as an MCP tool: `https://mcp.apify.com/?tools=nick.cheng/youtube-transcript-scraper`.

## Output rows

- `itemType: "transcript"` — `videoId`, `url`, `title`, `channelId`, `channelName`, `durationSeconds`,
  `transcriptLanguage`, `transcriptType` (`manual` / `auto-generated`), `transcript` (one string),
  `subtitles[0].segments` (`{start, end, text}` in seconds), `availableCaptionLanguages`
- `error: true, chargedForThis: false` — no captions on YouTube, or the video is unavailable; reason given

## Limits

YouTube's own captions only — no speech recognition of its own, so a video without captions gets no
transcript (and no charge). One language per video (the spoken one). No members-only, private or
age-restricted videos. For views, likes and publish dates use `nick.cheng/youtube-video-channel-scraper`
(skill `youtube-video-channel`), which can include the transcript too.
