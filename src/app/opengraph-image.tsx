import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "FoodBridge — Rescue Food. Feed People. Zero Waste.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#FEFAE0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          color: "#2D6A4F",
          fontSize: 34,
          fontWeight: 700,
          marginBottom: 44,
        }}
      >
        <svg
          width="42"
          height="42"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 2 17 2c2 4 3 8 1 12-1.7 3.4-5 5-7 6Z" />
          <path d="M2 22c0-6 6-10 10-12" />
        </svg>
        FoodBridge
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 78,
          fontWeight: 800,
          letterSpacing: -4,
          lineHeight: 1.13,
          color: "#1B1B1B",
        }}
      >
        <span>Rescue Food. Feed People.</span>
        <span style={{ color: "#2D6A4F" }}>Zero Waste.</span>
      </div>
      <div style={{ fontSize: 25, color: "#60695F", marginTop: 34 }}>
        Good food belongs in your community. Not in a landfill.
      </div>
      <div
        style={{
          position: "absolute",
          right: 75,
          bottom: 65,
          width: 110,
          height: 12,
          borderRadius: 8,
          background: "#FF6B6B",
        }}
      />
    </div>,
    size,
  );
}
