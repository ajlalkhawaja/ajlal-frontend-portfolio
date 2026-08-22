# Ajlal Haider - Senior Frontend Engineer Portfolio

A production-ready portfolio built with React, TypeScript, Vinext and Vite.

## Included

- Premium responsive one-page portfolio with mobile navigation
- Three.js hero scene with Ajlal's portrait and cursor depth
- Scroll reveals, kinetic typography, 3D tilt cards and reduced-motion support
- Filterable project case studies with challenge, contribution and outcome
- Interactive enterprise dashboard demonstration
- English and Arabic service portal demonstration with RTL layout
- Experience timeline and grouped technical skills
- Downloadable ATS-friendly resume
- GitHub, LinkedIn, email and optional phone contact actions
- Accessible controls and keyboard-visible focus states
- Search and social metadata

## Run locally (Windows, macOS or Linux)

Requirements: Node.js 22.13 or later.

```bash
npm install
npm run dev
```

Open the local URL displayed by the development server.

## Production build

For a local Windows build:

```bash
npm run build:local
npm start
```

The `npm run build` command is reserved for the hosting workflow because it uses Bash-based verification scripts.

## Deploy to Cloudflare Workers

The portfolio deploys as the existing React/Vinext application. It does not
need to be rewritten as static HTML and CSS.

Authenticate your Cloudflare account once:

```bash
npm run cloudflare:login
```

Build and publish the Worker:

```bash
npm run deploy:cloudflare
```

After the first deployment succeeds, open the new Worker in Cloudflare and add
`ajlalhaiderkhawaja.com` under Settings > Domains & Routes > Add > Custom Domain.
Add `www.ajlalhaiderkhawaja.com` as well, or redirect it to the root domain.

## Personalise before hosting

- The canonical public URL defaults to `https://ajlalhaiderkhawaja.com`.
- Replace reconstructed case-study copy only with information safe for public use.
- Keep client source code, internal data, API details and production screenshots private.

## Important content note

All dashboard and portal data in this portfolio is synthetic. Client case studies describe professional contributions without exposing confidential source code, internal data or production screens.
