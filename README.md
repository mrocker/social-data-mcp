# social-data-mcp

Pay-per-result social data tools — **X/Twitter profiles & tweets**, **YouTube videos & channels**,
**TikTok profiles & video stats**, and **YouTube / TikTok transcripts** — exposed to AI agents as MCP
servers and as Agent Skills. They run on [Apify](https://apify.com/nick.cheng). No platform API key is
needed and nothing logs in on its own; the one exception is full X timelines, which need cookies from a
session of your own (X shows logged-out visitors only an account's latest few posts). You are charged
only for results that actually came back, at the same price on every Apify plan (free included).

| Tool | Apify Actor | Price |
|---|---|---|
| X (Twitter) profiles, tweets, single-tweet lookup, engagement filters, incremental runs (full timelines with your own `cookies`) | [`nick.cheng/x-twitter-profile-tweets-scraper`](https://apify.com/nick.cheng/x-twitter-profile-tweets-scraper) | $0.005/account · $0.0003/tweet · $0.005/tweet lookup |
| YouTube video metadata & channel data, filters by views/duration/date | [`nick.cheng/youtube-video-channel-scraper`](https://apify.com/nick.cheng/youtube-video-channel-scraper) | $0.015/video · $0.005/channel |
| TikTok profiles & per-video stats | [`nick.cheng/tiktok-profile-stats-scraper`](https://apify.com/nick.cheng/tiktok-profile-stats-scraper) | $0.02/profile · $0.01/video |
| YouTube transcripts — spoken-language captions as text + timed segments, from links or channels | [`nick.cheng/youtube-transcript-scraper`](https://apify.com/nick.cheng/youtube-transcript-scraper) | $0.005/transcript; no captions, no charge |
| TikTok transcripts — TikTok's captions as text + timed segments | [`nick.cheng/tiktok-transcript-scraper`](https://apify.com/nick.cheng/tiktok-transcript-scraper) | $0.003/transcript; no captions, no charge |

The YouTube and TikTok tools can also return the transcript alongside the stats (`includeSubtitles: true`,
no extra charge).

Narrower single-purpose variants of the same code, for when you want exactly one thing:
[`x-profile-data`](https://apify.com/nick.cheng/x-profile-data) ·
[`single-tweet-scraper`](https://apify.com/nick.cheng/single-tweet-scraper) ·
[`youtube-video-stats`](https://apify.com/nick.cheng/youtube-video-stats) ·
[`tiktok-follower-count`](https://apify.com/nick.cheng/tiktok-follower-count) ·
[`tiktok-video-stats`](https://apify.com/nick.cheng/tiktok-video-stats).

## Use as an MCP server (hosted, no install)

Apify hosts an MCP endpoint for every Actor. Add one URL to any client that supports remote MCP
servers (Claude, Cursor, VS Code, …) and authenticate with your Apify account when prompted:

```
https://mcp.apify.com/?tools=nick.cheng/x-twitter-profile-tweets-scraper,nick.cheng/youtube-video-channel-scraper,nick.cheng/tiktok-profile-stats-scraper,nick.cheng/youtube-transcript-scraper,nick.cheng/tiktok-transcript-scraper
```

Or pick one: `https://mcp.apify.com/?tools=nick.cheng/youtube-transcript-scraper`.

The servers are also listed in the official MCP Registry as
`io.github.mrocker/x-twitter-profile-tweets`, `io.github.mrocker/youtube-video-channel`,
`io.github.mrocker/tiktok-profile-stats`, `io.github.mrocker/youtube-transcripts`,
`io.github.mrocker/tiktok-transcripts` (see `servers/`), and the first three on Smithery:
[nick-cheng/x-twitter-profile-tweets](https://smithery.ai/servers/nick-cheng/x-twitter-profile-tweets) ·
[nick-cheng/youtube-video-channel](https://smithery.ai/servers/nick-cheng/youtube-video-channel) ·
[nick-cheng/tiktok-profile-stats](https://smithery.ai/servers/nick-cheng/tiktok-profile-stats)
(the Smithery gateway forwards your Apify token as a `token` query parameter).

## Use as a local stdio server

Published on npm as [`social-data-mcp`](https://www.npmjs.com/package/social-data-mcp) and in the
MCP Registry as `io.github.mrocker/social-data-mcp`:

```json
{
  "mcpServers": {
    "social-data": {
      "command": "npx",
      "args": ["-y", "social-data-mcp"],
      "env": { "APIFY_TOKEN": "<your token>" }
    }
  }
}
```

This is a thin wrapper that starts Apify's own `@apify/actors-mcp-server` pre-scoped to the five
Actors above. Get a token at https://console.apify.com/account/integrations (free account is enough).

## Use as Agent Skills

```bash
npx skills add mrocker/social-data-mcp
```

Installs five skills — `x-twitter-profile-tweets`, `youtube-video-channel`, `tiktok-profile-stats`,
`youtube-transcripts`, `tiktok-transcripts` — each a short `SKILL.md` telling the agent when to call the tool, how (one `curl`), what comes
back, and what the tool cannot do.

## What these tools will not do

Keyword search on X, follower lists, reply threads, TikTok video lists per account, and speech
recognition of their own (transcripts are the platforms' own captions; a video without captions gets
none). Full X timelines need cookies you supply; nothing here signs in on its own or uses anyone
else's account. The READMEs on Apify say so up front.

*Correction (October 2026):* earlier versions of this page said YouTube transcripts were impossible and
that nothing here needed a login. The first was true only of the YouTube web player's caption links,
the only ones we had tested; the second stopped being true for X timelines when X rebuilt its web app.

## License

MIT for the code in this repository. The Actors themselves are used under Apify's terms.
