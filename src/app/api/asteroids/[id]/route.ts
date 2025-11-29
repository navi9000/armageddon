import { NextRequest, NextResponse } from "next/server"
import { NASA_API_KEY, NASA_API_ROOT } from "@/config/serverOnlyConstants"

export const GET = async (
  req: NextRequest,
  ctx: RouteContext<"/api/asteroids/[id]">
) => {
  try {
    const { id } = await ctx.params

    const url = NASA_API_ROOT.concat("/neo/", id, "?api_key=", NASA_API_KEY)

    const res = await fetch(url)

    if (!res.ok) {
      throw res.statusText
    }

    const data = await res.json()

    return NextResponse.json(
      {
        is_success: true,
        data,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      }
    )
  } catch (e) {
    let errorMessage
    if (typeof e === "string") {
      errorMessage = e
    } else if (e instanceof Error) {
      errorMessage = e.message
    } else {
      errorMessage = "Unexpected error"
    }

    return NextResponse.json(
      {
        is_success: false,
        errorMessage,
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      }
    )
  }
}
