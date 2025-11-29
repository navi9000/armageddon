import { NextRequest, NextResponse } from "next/server"
import { NASA_API_KEY, NASA_API_ROOT } from "@/config/serverOnlyConstants"
import { cacheLife } from "next/cache"

async function getAsteroid(ctx: RouteContext<"/api/asteroids/[id]">) {
  "use cache"
  cacheLife("hours")

  try {
    const { id } = await ctx.params

    const url = NASA_API_ROOT.concat("/neo/", id, "?api_key=", NASA_API_KEY)

    const res = await fetch(url)

    if (!res.ok) {
      throw res.statusText
    }

    const data = await res.json()

    return {
      is_success: true,
      data,
    }
  } catch (e) {
    let errorMessage
    if (typeof e === "string") {
      errorMessage = e
    } else if (e instanceof Error) {
      errorMessage = e.message
    } else {
      errorMessage = "Unexpected error"
    }

    return {
      is_success: false,
      errorMessage,
    }
  }
}

export const GET = async (
  req: NextRequest,
  ctx: RouteContext<"/api/asteroids/[id]">
) => {
  const res = await getAsteroid(ctx)

  return NextResponse.json(res, {
    status: res.is_success ? 200 : 500,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
  })
}
