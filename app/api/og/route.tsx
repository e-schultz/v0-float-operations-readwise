import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get("title") || "Twitter → Knowledge Base → LLM"
  const description =
    searchParams.get("description") ||
    "Transform your Twitter bookmarks into a queryable knowledge system for AI retrieval"

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)",
        fontFamily: "system-ui",
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
        }}
      />

      {/* Icons */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "32px" }}>
        <div
          style={{
            width: "64px",
            height: "64px",
            background: "#3b82f6",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
          }}
        >
          🐦
        </div>
        <div style={{ fontSize: "48px", color: "#64748b" }}>→</div>
        <div
          style={{
            width: "64px",
            height: "64px",
            background: "#10b981",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
          }}
        >
          🗄️
        </div>
        <div style={{ fontSize: "48px", color: "#64748b" }}>→</div>
        <div
          style={{
            width: "64px",
            height: "64px",
            background: "#8b5cf6",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
          }}
        >
          🧠
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: "48px",
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
          marginBottom: "24px",
          background: "linear-gradient(45deg, #6366f1, #8b5cf6, #06b6d4)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          maxWidth: "900px",
        }}
      >
        {title}
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: "24px",
          color: "#cbd5e1",
          textAlign: "center",
          maxWidth: "800px",
          lineHeight: 1.4,
          marginBottom: "32px",
        }}
      >
        {description}
      </div>

      {/* Tech Stack */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
        {["Readwise", "Vector Search", "AI Chat", "FLOAT"].map((tech) => (
          <div
            key={tech}
            style={{
              background: "rgba(99, 102, 241, 0.2)",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              borderRadius: "8px",
              padding: "8px 16px",
              color: "#e2e8f0",
              fontSize: "16px",
            }}
          >
            {tech}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          right: "32px",
          fontSize: "16px",
          color: "#64748b",
        }}
      >
        Built with v0.dev
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  )
}
