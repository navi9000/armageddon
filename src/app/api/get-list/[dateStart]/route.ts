import type { AsteroidListData } from "@/types/api"
import { NASA_API_KEY, NASA_API_ROOT } from "@/config/constants"
import { NextRequest } from "next/server"

export const GET = async (
  req: NextRequest,
  ctx: RouteContext<"/api/get-list/[dateStart]">
) => {
  try {
    const { dateStart } = await ctx.params

    const url = NASA_API_ROOT.concat(
      "/feed?start_date=",
      dateStart,
      "&api_key=",
      NASA_API_KEY
    )
    console.log({ url })

    const res = await fetch(
      NASA_API_ROOT.concat(
        "/feed?start_date=",
        "2025-11-24",
        "&api_key=",
        NASA_API_KEY
      )
    )
    if (!res.ok) {
      console.log({
        text: await res.text(),
        status: res.status,
        statusText: res.statusText,
        body: res.body,
      })
      throw res.statusText
    }
    const data = await res.json()
    return Response.json({
      is_success: true,
      data: data,
    })
  } catch (e) {
    let errorMessage
    if (typeof e === "string") {
      errorMessage = e
    } else if (e instanceof Error) {
      errorMessage = e.message
    } else {
      errorMessage = "Unexpected error"
    }

    return Response.json(
      {
        is_success: false,
        errorMessage,
      },
      { status: 500 }
    )
  }
}
