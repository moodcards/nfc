import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    // Create the pass.json structure client-side
    const passData = {
      description: `${data.name}'s Business Card`,
      formatVersion: 1,
      organizationName: data.company,
      serialNumber: Date.now().toString(),
      generic: {
        primaryFields: [
          {
            key: "name",
            label: "NAME",
            value: data.name,
          },
        ],
        secondaryFields: [
          {
            key: "title",
            label: "TITLE",
            value: data.title,
          },
        ],
        auxiliaryFields: [
          {
            key: "email",
            label: "EMAIL",
            value: data.email,
          },
          {
            key: "phone",
            label: "PHONE",
            value: data.phone,
          },
        ],
      },
      backgroundColor: "rgb(63, 61, 140)",
      foregroundColor: "rgb(255, 255, 255)",
      labelColor: "rgb(255, 255, 255)",
      logoText: data.company,
    }

    // Create URL for Apple Wallet web service
    const applePassUrl = `https://wallet.apple.com/passes/create?data=${encodeURIComponent(JSON.stringify(passData))}`

    return NextResponse.json({ url: applePassUrl })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Failed to generate pass" }, { status: 500 })
  }
}

