# Cloudflare deployment — Windows

This project is the approved cinematic React/Vinext portfolio for
`https://ajlalhaiderkhawaja.com`.

## Replace the existing project

1. Stop the development server with `Ctrl+C`.
2. Keep a backup of your current project folder.
3. Extract this package into `D:\My Portfolio Website` and replace the files.
4. Open PowerShell in that folder.

## Install and review locally

```powershell
npm install
npm run dev
```

Open the address shown by Vite, normally `http://localhost:5173`.

## Deploy to the existing Cloudflare Worker

Authenticate once if needed:

```powershell
npm run cloudflare:login
```

Build and deploy:

```powershell
npm run deploy:cloudflare
```

The package name remains `ajlal-frontend-portfolio`, so Wrangler updates the
existing Worker with that name instead of requiring a new portfolio Worker.

After deployment, keep `ajlalhaiderkhawaja.com` connected under the Worker's
**Settings → Domains & Routes**. The `www` redirect can continue pointing to
the root domain.

## Push the same version to GitHub

```powershell
git add .
git commit -m "Redesign portfolio with cinematic project case studies"
git push
```

The portrait is loaded directly from `/public/ajlal-portrait-clean.png`; it
does not use Vinext's local image-optimization route.
