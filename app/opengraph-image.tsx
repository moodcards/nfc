import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Digital Business Card"
export const size = {
  width: 1200,
  height: 630,
}

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(to bottom right, #3F3D8C, #2D2B66)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 48,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <img
          src="profile.jpg"
          alt="Profile"
          width={200}
          height={200}
          style={{
            borderRadius: "50%",
            border: "4px solid white",
          }}
        />
        <h1
          style={{
            fontSize: 64,
            color: "white",
            textAlign: "center",
          }}
        >
          John Doe
        </h1>
        <p
          style={{
            fontSize: 32,
            color: "rgba(255,255,255,0.9)",
            textAlign: "center",
          }}
        >
          Business Development Manager at Biz Franchise
        </p>
      </div>
    </div>,
    {
      ...size,
    },
  )
}

