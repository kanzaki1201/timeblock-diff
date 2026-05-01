# Timeblock Diff

Personal time blocking PWA. Plan your day in blocks, log what actually happened, see the diff.

## Features

- **Side-by-side timelines** -- Planned vs Actual, drag to create blocks, drag edges to resize
- **Category system** -- customizable categories with color picker
- **Diff table** -- inline diff under timelines + dedicated day-by-day Diff tab
- **Weekly stats** -- bar chart + per-category breakdown, "This Week" / "Last 7 Days" toggle
- **Customizable range** -- set your own start/end hours via Settings (gear icon)
- **Cross-device sync** -- server-side JSON storage, debounced writes
- **Data portability** -- JSON export/import
- **PWA** -- installable on mobile, works offline via service worker

## Two ways to run

### GitHub Pages (browser-only)

Open the hosted page -- data stays in localStorage per device. HTTPS means PWA install works out of the box.

### Local server (cross-device sync)

```bash
node serve.js         # port 8070 (default)
node serve.js 3000    # custom port
```

All devices hitting the server share the same data via `GET/POST /api/data`. Access from your phone over VPN using the printed IP. Runs as a systemd user service (`timeblocks.service`) for auto-start on boot.

Same codebase for both modes -- the sync layer gracefully no-ops when the API isn't available.

### PWA install on local server

The local server runs HTTP by default. To get the PWA install prompt on your phone over LAN, either:

- Add your server's URL to Chrome Android's `chrome://flags/#unsafely-treat-insecure-origin-as-secure`
- Or run `./setup.sh` to generate HTTPS certs with `mkcert`

## Data

| Key / Location | Contents |
|----------------|----------|
| `tb_data` (localStorage) | Block data per day (absolute minutes from midnight) |
| `tb_cats` (localStorage) | Category definitions |
| `tb_settings` (localStorage) | Display settings (hour range) |
| `data/store.json` (server) | Combined sync state (blocks + categories + settings) |
