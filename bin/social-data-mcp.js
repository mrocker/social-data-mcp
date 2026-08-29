#!/usr/bin/env node
// Thin stdio MCP server: runs Apify's actors-mcp-server pre-scoped to the three social data Actors.
// Needs APIFY_TOKEN in the environment (https://console.apify.com/account/integrations).
// Prefer the hosted endpoint when your client supports remote MCP servers:
//   https://mcp.apify.com/?tools=nick.cheng/x-twitter-profile-tweets-scraper,nick.cheng/youtube-video-channel-scraper,nick.cheng/tiktok-profile-stats-scraper
import { spawn } from 'node:child_process';

const ACTORS = [
  'nick.cheng/x-twitter-profile-tweets-scraper',
  'nick.cheng/youtube-video-channel-scraper',
  'nick.cheng/tiktok-profile-stats-scraper',
];
if (!process.env.APIFY_TOKEN) {
  process.stderr.write('social-data-mcp: set APIFY_TOKEN (free Apify account works; you pay per result, same price on every plan)\n');
  process.exit(1);
}
const child = spawn('npx', ['-y', '@apify/actors-mcp-server', '--actors', ACTORS.join(',')], {
  stdio: 'inherit', env: process.env, shell: process.platform === 'win32',
});
child.on('exit', (code) => process.exit(code ?? 0));
