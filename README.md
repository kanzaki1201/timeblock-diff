# Timeblock Diff

Personal time blocking PWA. Plan your day in blocks, log what actually happened, see the diff.

## Features

- **Side-by-side timelines** -- Planned vs Actual, drag to create blocks, drag edges to resize
- **Category system** -- customizable categories with color picker
- **Diff table** -- per-category comparison of planned vs actual time
- **Weekly stats** -- bar chart + per-category breakdown, "This Week" / "Last 7 Days" toggle
- **Customizable range** -- set your own start/end hours via Settings (gear icon)
- **Data portability** -- JSON export/import
- **Offline-first** -- all data in localStorage, no server needed

## Usage

Open `index.html` in a browser, or deploy to GitHub Pages.

Single-file PWA -- no build step, no dependencies beyond CDN-loaded React.

## Data

Stored in localStorage:

| Key | Contents |
|-----|----------|
| `tb_data` | Block data per day (absolute minutes from midnight) |
| `tb_cats` | Category definitions |
| `tb_settings` | Display settings (hour range) |
