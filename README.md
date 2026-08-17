# AISee Travel portals

Operator console and tourist companion for the AISee AR glasses deployment at Sigiriya (Aitken Spence Travels · Central Province fleet).

```bash
npm install
npm run dev
npm run check   # unit-economics + fleet invariants
```

- Hub: `/`
- Operator: `/operator`
- Companion: `/companion`

Glasses image ingest (Vercel Blob): [`docs/media-api.md`](docs/media-api.md) — `POST /api/v1/media`.

Deploy on Vercel as a **Next.js** app (`vercel.json` pins the framework). Do not set Output Directory to `public` — that folder is static assets, not the build output. `.next` is produced by `next build` and handled by the Next.js preset.
