# FLH Anesthesia Portal — GitHub Pages

Static migration of https://www.gghanesthesia.com/ (Google Sites). One self-contained HTML file per page.

## Files

| File | Page |
|---|---|
| index.html | Home portal (tile grid) |
| new-schedule.html | Schedules (year archives, OR staff, long weekends, federal holidays) |
| new-call-team.html | On Call Team — live daily view from published Google Sheet CSV |
| new-drug-labels.html | Anesthesia drug label printer (React) — drug list from published Sheet CSV |
| trial-block-schedule.html | Block Schedule — iframe wrapper around the "Block Schedule Viewer" Apps Script web app |
| or-emergencies.html | OR Emergency Manual (ACLS / critical events) |
| useful-links.html | Useful Links resource hub |
| sab-notes.html | Spinal (SAB) note label generator |
| bmi.html | BMI & Height calculator (linked from Useful Links) |

## How to publish (one time, ~5 minutes)

1. Go to https://github.com/new (sign in first).
2. Repository name: e.g. `flh-anesthesia`. Set it to **Public**. Click **Create repository**.
3. On the new repo page, click **uploading an existing file**.
4. Drag all 9 `.html` files (and this README) from this folder into the upload box. Click **Commit changes**.
5. Go to the repo's **Settings → Pages**. Under "Branch", choose **main** and folder **/ (root)**. Click **Save**.
6. Wait 1–2 minutes. The site will be live at `https://<your-username>.github.io/flh-anesthesia/`.

To use the custom domain www.gghanesthesia.com later, add it under Settings → Pages → Custom domain and update the domain's DNS CNAME to `<your-username>.github.io`.

## Live-data dependencies (leave as-is, they keep working)

- On Call Team reads a **published-to-web CSV** of the FLH Call Schedule sheet.
- Drug Labels reads a **published-to-web CSV** for the drug list.
- Block Schedule embeds the **Apps Script web app** (deployed as "Anyone can access").

If any of these ever stops loading, check that the sheet is still File → Share → Publish to web, and the Apps Script deployment is still active.

## Installable app (PWA)

The site is a Progressive Web App. On a phone, open the site in the browser and choose **Add to Home Screen** (iPhone: Share button → Add to Home Screen; Android: menu → Install app). It opens full-screen with its own icon. After the first visit, all pages — including the OR Emergency Manual — keep working offline. Live data (call team, drug list, block schedule) still needs a connection.

Files involved: `manifest.json` (app identity + icons), `sw.js` (offline caching), `icons/` (app icons). If you change any page, also bump `CACHE_VERSION` in `sw.js` (e.g. `flh-v1` → `flh-v2`) so installed apps pick up the update promptly.

## Updating a page

Edit the matching `.html` file on GitHub (pencil icon), commit, and the live site updates automatically in about a minute.
