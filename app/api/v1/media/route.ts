import { blobConfigured, listCaptures, putCapture } from "@/lib/blob";
import { isAllowedImage, type CaptureMeta } from "@/lib/captures";

export const runtime = "nodejs";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
};

function json(data: unknown, status = 200) {
  return Response.json(data, { status, headers: CORS });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

function ingestAuthorized(request: Request): boolean {
  const expected = process.env.MEDIA_INGEST_TOKEN;
  if (!expected) return true;
  const header = request.headers.get("authorization") ?? "";
  return header === `Bearer ${expected}`;
}

export async function GET(request: Request) {
  const deviceId = new URL(request.url).searchParams.get("device_id")?.trim();
  try {
    const captures = await listCaptures(deviceId || undefined);
    return json({
      configured: blobConfigured(),
      captures,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "list failed";
    return json({ error: { code: "blob_list_failed", message } }, 502);
  }
}

export async function POST(request: Request) {
  if (!ingestAuthorized(request)) {
    return json({ error: { code: "unauthorized", message: "Bearer token required" } }, 401);
  }
  if (!blobConfigured()) {
    return json(
      {
        error: {
          code: "blob_not_configured",
          message:
            "Create a Vercel Blob store and reconnect the project so BLOB_READ_WRITE_TOKEN is set.",
        },
      },
      503,
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ error: { code: "invalid_form", message: "expected multipart/form-data" } }, 400);
  }

  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return json({ error: { code: "file_required", message: "multipart field 'file' is required" } }, 400);
  }

  const typeError = isAllowedImage(file.type, file.size);
  if (typeError) {
    return json({ error: { code: "unsupported_file", message: typeError } }, 400);
  }

  let meta: CaptureMeta = {};
  const raw = form.get("meta");
  if (typeof raw === "string" && raw.trim()) {
    try {
      meta = JSON.parse(raw) as CaptureMeta;
    } catch {
      return json({ error: { code: "invalid_meta", message: "meta must be JSON" } }, 400);
    }
  }
  const deviceField = form.get("device_id");
  if (typeof deviceField === "string" && !meta.device_id) meta.device_id = deviceField;

  try {
    const capture = await putCapture(file, { ...meta, media: "photo" });
    return json({ capture }, 201);
  } catch (err) {
    const message = err instanceof Error ? err.message : "upload failed";
    return json({ error: { code: "blob_put_failed", message } }, 502);
  }
}
