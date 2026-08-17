/** Path helpers for Vercel Blob captures. Kept free of @vercel/blob so scripts/check can import it. */

export const CAPTURE_PREFIX = "captures/";
export const MAX_CAPTURE_BYTES = 8 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

export type CaptureMeta = {
  capture_id?: string;
  device_id?: string;
  session_id?: string;
  title?: string;
  node_id?: string;
  poi_id?: string;
  media?: "photo";
};

export type Capture = {
  url: string;
  pathname: string;
  uploadedAt: string;
  size: number;
  contentType: string;
  device_id: string;
  capture_id: string;
  title: string | null;
  node_id: string | null;
};

const DEVICE_RE = /^AS-ARIA-\d{3}$/;
const SLUG_RE = /[^a-zA-Z0-9._-]+/g;

export function sanitizeDeviceId(raw: string | undefined): string {
  const v = (raw ?? "").trim().toUpperCase();
  return DEVICE_RE.test(v) ? v : "UNKNOWN";
}

export function slug(raw: string | undefined, fallback: string): string {
  const s = (raw ?? "").trim().replace(SLUG_RE, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return s.slice(0, 64) || fallback;
}

export function capturePathname(meta: CaptureMeta, filename: string): string {
  const device = sanitizeDeviceId(meta.device_id);
  const id = slug(meta.capture_id, `cap_${Date.now()}`);
  const file = slug(filename.split(/[/\\]/).pop(), "frame.jpg");
  return `${CAPTURE_PREFIX}${device}/${id}-${file}`;
}

export function parseCapturePath(pathname: string): Pick<
  Capture,
  "device_id" | "capture_id"
> {
  const rest = pathname.startsWith(CAPTURE_PREFIX)
    ? pathname.slice(CAPTURE_PREFIX.length)
    : pathname;
  const [device, ...tail] = rest.split("/");
  const file = tail.join("/") || device;
  const capture_id = file.split("-")[0] || file;
  return {
    device_id: sanitizeDeviceId(device),
    capture_id,
  };
}

export function isAllowedImage(type: string, size: number): string | null {
  if (!ALLOWED_IMAGE_TYPES.has(type)) {
    return "file must be jpeg, png, webp, gif, or avif";
  }
  if (size > MAX_CAPTURE_BYTES) {
    return `file must be ≤ ${MAX_CAPTURE_BYTES} bytes`;
  }
  return null;
}
