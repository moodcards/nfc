import { type NextRequest, NextResponse } from "next/server"
import { generatePass } from "@/app/actions/generatePass"

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const url = await generatePass(data)

    return NextResponse.json({ url })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Failed to generate pass" }, { status: 500 })
  }
}

