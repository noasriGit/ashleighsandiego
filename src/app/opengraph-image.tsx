import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site-config";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #670038 0%, #2A2223 100%)",
          padding: "72px",
          color: "#F5F1F2",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              background: "#F5F1F2",
              color: "#670038",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            SD
          </div>
          <div style={{ fontSize: "26px", letterSpacing: "2px", textTransform: "uppercase", opacity: 0.85 }}>
            {siteConfig.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ fontSize: "68px", lineHeight: 1.1, maxWidth: "950px" }}>
            Moving to San Diego? Start with a clear home-buying plan.
          </div>
          <div
            style={{
              fontSize: "30px",
              fontFamily: "Arial, sans-serif",
              color: "#C299AF",
              maxWidth: "900px",
            }}
          >
            Neighborhood guidance, relocation resources, and home search support near La Jolla.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
