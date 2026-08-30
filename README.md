# social-data-mcp

Three pay-per-result social data tools — **X/Twitter profiles & tweets**, **YouTube videos &
channels**, **TikTok profiles & video stats** — exposed to AI agents as MCP servers and as Agent
Skills. They run on [Apify](https://apify.com/nick.cheng); nothing here needs a login, a cookie, or a
platform API key, and you are charged only for rows that actually came back, at the same price on
every Apify plan (free included).

| Tool | Apify Actor | Price |
|---|---|---|
| X (Twitter) profiles, tweets, single-tweet lookup, engagement filters, incremental runs | [`nick.cheng/x-twitter-profile-tweets-scraper`](https://apify.com/nick.cheng/x-twitter-profile-tweets-scraper) | $0.005/account · $0.0003/tweet · $0.005/tweet lookup |
| YouTube video metadata & channel data, filters by views/duration/date | [`nick.cheng/youtube-video-channel-scraper`](https://apify.com/nick.cheng/youtube-video-channel-scraper) | $0.015/video · $0.005/channel |
| TikTok profiles & per-video stats | [`nick.cheng/tiktok-profile-stats-scraper`](https://apify.com/nick.cheng/tiktok-profile-stats-scraper) | $0.02/profile · $0.01/video |

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
https://mcp.apify.com/?tools=nick.cheng/x-twitter-profile-tweets-scraper,nick.cheng/youtube-video-channel-scraper,nick.cheng/tiktok-profile-stats-scraper
```

Or pick one: `https://mcp.apify.com/?tools=nick.cheng/tiktok-profile-stats-scraper`.

The three servers are also listed in the official MCP Registry as
`io.github.mrocker/x-twitter-profile-tweets`, `io.github.mrocker/youtube-video-channel`,
`io.github.mrocker/tiktok-profile-stats` (see `servers/`), and on Smithery:
[nick-cheng/x-twitter-profile-tweets](https://smithery.ai/servers/nick-cheng/x-twitter-profile-tweets) ·
[nick-cheng/youtube-video-channel](https://smithery.ai/servers/nick-cheng/youtube-video-channel) ·
[nick-cheng/tiktok-profile-stats](https://smithery.ai/servers/nick-cheng/tiktok-profile-stats)
(the Smithery gateway forwards your Apify token as a `token` query parameter).

## Use as a local stdio server

```json
{
  "mcpServers": {
    "social-data": {
      "command": "npx",
      "args": ["-y", "github:mrocker/social-data-mcp"],
      "env": { "APIFY_TOKEN": "<your token>" }
    }
  }
}
```

This is a thin wrapper that starts Apify's own `@apify/actors-mcp-server` pre-scoped to the three
Actors. Get a token at https://console.apify.com/account/integrations (free account is enough).

## Use as Agent Skills

```bash
npx skills add mrocker/social-data-mcp
```

Installs three skills — `x-twitter-profile-tweets`, `youtube-video-channel`, `tiktok-profile-stats`
— each a short `SKILL.md` telling the agent when to call the tool, how (one `curl`), what comes
back, and what the tool cannot do.

## What these tools will not do

Keyword search on X, follower lists, reply threads, YouTube transcripts, TikTok video lists per
account. Each of those needs either a logged-in account or defeating a platform's proof-of-origin
check, and these tools do neither. The READMEs on Apify say so up front.

## License

MIT for the code in this repository. The Actors themselves are used under Apify's terms.
