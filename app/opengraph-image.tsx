import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Riviora — Chauffeur Privé & Excursions Côte d'Azur";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0B1F3A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 24 }}>
          <span style={{ fontSize: 72, fontWeight: 700, color: "white", letterSpacing: 10 }}>RIVI</span>
          <span style={{ fontSize: 72, fontWeight: 700, color: "#C9A96E", letterSpacing: 10 }}>ORA</span>
        </div>
        <div style={{ width: 80, height: 2, background: "#C9A96E", marginBottom: 28 }} />
        <div style={{ fontSize: 26, color: "rgba(255,255,255,0.85)", letterSpacing: 4, textTransform: "uppercase" }}>
          Chauffeur Privé · Côte d'Azur
        </div>
        <div style={{ fontSize: 18, color: "rgba(255,255,255,0.45)", marginTop: 16, letterSpacing: 2 }}>
          Monaco · Saint-Tropez · Cannes · Nice
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
