# Media ingest (Vercel Blob)

Glasses and tools POST images to the operator dashboard through this app. Files land in **Vercel Blob** and show up on Live Operations, Content & AR Assets, and the companion Memory Vault.

## Connect the store (once)

1. Open the Vercel project → **Storage** → **Create Database** → **Blob**.
2. Connect the store to this project (production + preview + development).
3. Redeploy. Vercel injects `BLOB_READ_WRITE_TOKEN`.

Optional: set `MEDIA_INGEST_TOKEN` on the project. If set, POST requires `Authorization: Bearer <token>`.

## Endpoint

`POST /api/v1/media` — `multipart/form-data`

| Field | Required | Notes |
| --- | --- | --- |
| `file` | yes | jpeg / png / webp / gif / avif, ≤ 8 MB |
| `meta` | no | JSON string (glasses contract `CaptureMeta`) |
| `device_id` | no | shortcut if `meta` is omitted |

`GET /api/v1/media` — `{ configured, captures[] }`  
`GET /api/v1/media?device_id=AS-ARIA-024` — filter

```bash
curl -sS -X POST https://<host>/api/v1/media \
  -F "file=@sigiriya.jpg;type=image/jpeg" \
  -F 'meta={"device_id":"AS-ARIA-024","capture_id":"cap_vg01","node_id":"water-gardens","title":"Fountain #3"}'
```

Response `201`:

```json
{
  "capture": {
    "url": "https://….public.blob.vercel-storage.com/captures/AS-ARIA-024/…",
    "pathname": "captures/AS-ARIA-024/cap_vg01-sigiriya.jpg",
    "device_id": "AS-ARIA-024",
    "capture_id": "cap_vg01"
  }
}
```
