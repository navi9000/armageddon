import { NextRequest, NextResponse } from "next/server"
import { NASA_API_KEY, NASA_API_ROOT } from "@/config/serverOnlyConstants"
import { cacheLife } from "next/cache"
import { toDatestring } from "@/helpers/dates"

async function getAsteroid(ctx: RouteContext<"/api/asteroids/[id]">) {
  "use cache"
  cacheLife("hours")

  try {
    const { id } = await ctx.params

    const url = new URL(NASA_API_ROOT.concat("/neo/", id))
    url.searchParams.set("api_key", NASA_API_KEY)

    const res = await fetch(url)

    if (!res.ok) {
      throw res.statusText
    }

    const data = await res.json()

    return {
      is_success: true,
      data: {
        asteroid: {
          id: data.id,
          name: data.name,
          is_hazardous: data.is_potentially_hazardous_asteroid,
          diameter: data.estimated_diameter.meters.estimated_diameter_min,
          nearest_approach_index: data.close_approach_data.findIndex(
            (item: any) => item.close_approach_date >= toDatestring(new Date())
          ),
        },
        approaches: data.close_approach_data.map((entry: any) => ({
          date: entry.close_approach_date,
          velocity: entry.relative_velocity.kilometers_per_second,
          miss_distance: {
            km: entry.miss_distance.kilometers,
            lunar: entry.miss_distance.lunar,
          },
          orbiting_body: entry.orbiting_body,
        })),
      },
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
