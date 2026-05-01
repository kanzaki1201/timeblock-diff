#!/usr/bin/env bash
PORT="${1:-8070}"
HOST="0.0.0.0"

echo "Serving on http://$HOST:$PORT"
echo "Local IPs:"
ip -4 addr show | grep -oP 'inet \K[\d.]+' | grep -v '127.0.0.1' | sed 's/^/  http:\/\//'  | sed "s/$/:$PORT/"
echo ""

python3 -m http.server "$PORT" --bind "$HOST"
