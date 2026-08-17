import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#F6F0E6",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#C45C26",
          fontSize: 18,
          fontFamily: "Georgia, serif",
        }}
      >
        M
      </div>
    ),
    size,
  );
}
