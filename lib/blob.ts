import { list, put } from "@vercel/blob";
import {
  CAPTURE_PREFIX,
  type Capture,
  type CaptureMeta,
  capturePathname,
  parseCapturePath,
} from "./captures";

export function blobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function listCaptures(deviceId?: string): Promise<Capture[]> {
  if (!blobConfigured()) return [];

  const prefix = deviceId
    ? `${CAPTURE_PREFIX}${deviceId}/`
    : CAPTURE_PREFIX;
  const { blobs } = await list({ prefix, limit: 100 });

  return blobs
    .map((b) => {
      const parsed = parseCapturePath(b.pathname);
      return {
        url: b.url,
        pathname: b.pathname,
        uploadedAt: b.uploadedAt.toISOString(),
        size: b.size,
        contentType: "image/*",
        device_id: parsed.device_id,
        capture_id: parsed.capture_id,
        title: null,
        node_id: null,
      } satisfies Capture;
    })
    .sort((a, b) => (a.uploadedAt < b.uploadedAt ? 1 : -1));
}

export async function putCapture(
  file: File,
  meta: CaptureMeta,
): Promise<Capture> {
  const pathname = capturePathname(meta, file.name);
  const blob = await put(pathname, file, {
    access: "public",
    addRandomSuffix: true,
    contentType: file.type || "image/jpeg",
  });
  const parsed = parseCapturePath(blob.pathname);
  return {
    url: blob.url,
    pathname: blob.pathname,
    uploadedAt: new Date().toISOString(),
    size: file.size,
    contentType: file.type || "image/jpeg",
    device_id: parsed.device_id,
    capture_id: parsed.capture_id,
    title: meta.title ?? null,
    node_id: meta.node_id ?? null,
  };
}
