import { NASA_API_KEY, NASA_API_ROOT } from "@/config/serverOnlyConstants"
import { cacheLife } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

async function getList(
  ctx: RouteContext<"/api/asteroids/by-date/[dateStart]">
) {
  "use cache"
  cacheLife("hours")

  try {
    const { dateStart } = await ctx.params

    const url = new URL(NASA_API_ROOT.concat("/feed"))
    url.searchParams.set("start_date", dateStart)
    url.searchParams.set("end_date", dateStart)
    url.searchParams.set("api_key", NASA_API_KEY)

    const res = await fetch(url)
    if (!res.ok) {
      throw res.statusText
    }
    const data = await res.json()
    const nextSearchParams = new URL(data.links.next)
    return {
      is_success: true,
      data,
      meta: {
        next: nextSearchParams.searchParams.get("start_date"),
      },
      newData: Object.entries(data.near_earth_objects).flatMap(
        ([_, key]: any) =>
          key.map((entry: any) => ({
            asteroid: {
              id: entry.id,
              name: entry.name,
              is_hazardous: entry.is_potentially_hazardous_asteroid,
              diameter: entry.estimated_diameter.meters.estimated_diameter_min,
              nearest_approach_index: 0,
            },
            approaches: entry.close_approach_data.map((approach: any) => ({
              date: approach.close_approach_date,
              miss_distance: {
                km: approach.miss_distance.kilometers,
                lunar: approach.miss_distance.lunar,
              },
              orbiting_body: approach.orbiting_body,
              velocity: approach.relative_velocity.kilometers_per_second,
            })),
          }))
      ),
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
  ctx: RouteContext<"/api/asteroids/by-date/[dateStart]">
) => {
  const res = await getList(ctx)
  return NextResponse.json(res, {
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
    status: res.is_success ? 200 : 500,
  })
}
