"use server"

export async function generatePass(contactInfo: {
  name: string
  title: string
  company: string
  email: string
  phone: string
  website: string
}) {
  try {
    // Create the pass.json structure
    const passData = {
      description: `${contactInfo.name}'s Business Card`,
      formatVersion: 1,
      organizationName: contactInfo.company,
      passTypeIdentifier: process.env.APPLE_PASS_TYPE_ID,
      serialNumber: Date.now().toString(),
      teamIdentifier: process.env.APPLE_TEAM_ID,
      generic: {
        primaryFields: [
          {
            key: "name",
            label: "NAME",
            value: contactInfo.name,
          },
        ],
        secondaryFields: [
          {
            key: "title",
            label: "TITLE",
            value: contactInfo.title,
          },
        ],
        auxiliaryFields: [
          {
            key: "email",
            label: "EMAIL",
            value: contactInfo.email,
          },
          {
            key: "phone",
            label: "PHONE",
            value: contactInfo.phone,
          },
        ],
      },
      backgroundColor: "rgb(63, 61, 140)",
      foregroundColor: "rgb(255, 255, 255)",
      labelColor: "rgb(255, 255, 255)",
      logoText: contactInfo.company,
    }

    // Create URL for Apple Wallet web service
    const applePassUrl = `https://wallet.apple.com/passes/create?data=${encodeURIComponent(JSON.stringify(passData))}`

    return applePassUrl
  } catch (error) {
    console.error("Error generating pass:", error)
    throw new Error("Failed to generate pass")
  }
}

