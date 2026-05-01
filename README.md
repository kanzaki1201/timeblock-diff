# Timeblock Diff

Personal time blocking PWA. Plan your day in blocks, log what actually happened, see the diff.

## Features

- **Side-by-side timelines** -- Planned vs Actual, drag to create blocks, drag edges to resize
- **Category system** -- customizable categories with color picker
- **Diff table** -- inline diff under timelines + dedicated day-by-day Diff tab
- **Weekly stats** -- bar chart + per-category breakdown, "This Week" / "Last 7 Days" toggle
- **Customizable range** -- set your own start/end hours via Settings (gear icon)
- **Data portability** -- JSON export/import
- **PWA** -- installable on mobile, works offline via service worker

## Setup

```bash
# One-time: generate HTTPS certs for local network access
./setup.sh

# Start the server
node serve.js         # port 8070 (default)
node serve.js 3000    # custom port
```

The setup script uses `mkcert` to create locally-trusted certificates. To install on your phone, transfer the root CA file (path printed by setup.sh) and install it in your device's certificate settings.

Without certs, the server falls back to HTTP -- the app works but PWA install won't be available over LAN.

## Data

Stored in localStorage:

| Key | Contents |
|-----|----------|
| `tb_data` | Block data per day (absolute minutes from midnight) |
| `tb_cats` | Category definitions |
| `tb_settings` | Display settings (hour range) |
