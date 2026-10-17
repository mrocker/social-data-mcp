---
name: x-twitter-profile-tweets
description: Fetch X (Twitter) profiles and single tweets by handle, URL or ID without login or an X API key, and account timelines (the latest few posts logged-out, full depth with your own session cookies), with engagement filters and incremental runs. Use when a task needs real X/Twitter account data or tweet metrics.
---

# X (Twitter) profiles & tweets

Pay-per-result Apify Actor `nick.cheng/x-twitter-profile-tweets-scraper`. No X developer key.
Profiles and single tweets need no login. **Timelines:** since X rebuilt its web app (October 2026),
logged-out visitors see only an account's latest few posts — pass `cookies` (`auth_token` and `ct0`
of a logged-in session, ideally a secondary account) for full depth. Charges only for rows that actually came back ($0.005/account, $0.0003/tweet,
$0.005/single-tweet lookup — same on every Apify plan). Needs `APIFY_TOKEN`
(free account: https://console.apify.com/account/integrations).

## When to use

- "What does @handle's profile say / how many followers" → `scrapeProfilesOnly: true`
- "Latest N tweets from these accounts" → `twitterHandles` + `maxTweetsPerProfile` (more than the latest few needs `cookies`)
- "Only tweets with > X likes / containing a phrase" → `minLikes`, `minViews`, `textContains`, `textRegex`
- "Get this tweet by its URL" → `tweetUrls`
- "Poll every 15 min, only new tweets" → `incremental: true`, `stateStoreName`

## Call it

```bash
curl -s -X POST "https://api.apify.com/v2/acts/nick.cheng~x-twitter-profile-tweets-scraper/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"twitterHandles":["nasa"],"maxTweetsPerProfile":20,"minLikes":100}'
```

Or as an MCP tool: `https://mcp.apify.com/?tools=nick.cheng/x-twitter-profile-tweets-scraper`.

## Input (all optional except one target)

| Field | Meaning |
|---|---|
| `twitterHandles` / `startUrls` / `userIds` | Accounts to scrape |
| `tweetUrls` | Single tweets by link or numeric ID (no timeline walk) |
| `maxTweetsPerProfile` | Per-account cap, default 100; `0` = profile only |
| `cookies` | Optional secret: `auth_token=…; ct0=…` of a logged-in session, for timelines beyond the latest few posts |
| `scrapeProfilesOnly` | Cheapest mode for bulk enrichment |
| `since` / `until` | ISO dates; `since` stops paging early |
| `minLikes` / `minRetweets` / `minReplies` / `minViews` / `minTextLength` | Engagement floors; filtered tweets are not charged |
| `textContains` / `excludeTextContains` / `textRegex` | Text filters, case-insensitive |
| `incremental` / `stateStoreName` / `sinceId` | Resume after the newest tweet seen last run |
| `includeReplies` / `includeRetweets` / `onlyWithMedia` | Type filters |
| `maxItems` | Hard cap on rows for the run |

## Output rows

- `itemType: "profile"` — `userName`, `name`, `description`, `followers`, `following`, `tweetsCount`,
  `createdAt`, `verifiedType`, `affiliatesCount`, `location`, `website`, … — `verifiedSince`, `parodyCommentaryFanLabel`,
  `isIdentityVerified`, `mediaCount`, `favouritesCount` and a few others are `null`: X no longer sends them to logged-out visitors
- `itemType: "tweet"` — `id`, `url`, `text` (long-form not truncated), `createdAt`, `likeCount`,
  `retweetCount`, `replyCount`, `quoteCount`, `viewCount`, `bookmarkCount`, `media`, `hashtags`,
  `mentions`, `urls`, `isRetweet`, `isQuote`, `isReply`, `author` (embedded profile)
- `error: true, chargedForThis: false` — target could not be scraped; reason given

## Limits (say so instead of working around them)

No keyword/hashtag search, no follower lists, no reply threads. Without `cookies`, timelines stop at
the latest few posts. The Actor never logs in on its own and never uses anyone else's account; with
`cookies` it uses only the session you supply. Protected accounts return the profile only.
