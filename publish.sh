#!/usr/bin/env bash
# Publish the three servers to the official MCP Registry (registry.modelcontextprotocol.io).
# Namespace io.github.mrocker/* is proven by logging into GitHub as mrocker — a device-code flow
# that has to be done interactively once:  mcp-publisher login github
set -euo pipefail
cd "$(dirname "$0")"
command -v mcp-publisher >/dev/null || { echo "install mcp-publisher first: brew install mcp-publisher"; exit 1; }
for d in servers/*/; do
  echo "== $d"
  (cd "$d" && mcp-publisher publish)
done
