import type { MyFC } from "@/types"
import { ROOT_URL } from "@/config/constants"
import LoadedAsteroid from "@/components/asteroid-showcase/LoadedAsteroid"
import { cacheLife } from "next/cache"
import { Suspense } from "react"
import { Asteroid_v2 } from "@/types/api"
import { toDatestring } from "@/helpers/dates"

const Cached: MyFC<PageProps<"/asteroid/[id]">> = async ({ params }) => {
  "use cache"
  cacheLife("hours")

  const { id } = await params
  const res = await fetch(ROOT_URL.concat("/api/asteroids/", id))

  if (!res.ok) {
    return <main>Error</main>
  }

  const json = await res.json()

  const data = json.data

  console.log({ json })
  // const newData: Asteroid_v2 = {
  //   asteroid: {
  //     id: data.id,
  //     name: data.name,
  //     is_hazardous: data.is_potentially_hazardous_asteroid,
  //     diameter: data.estimated_diameter.meters.estimated_diameter_min,
  //     nearest_approach_index: data.close_approach_data.findIndex(
  //       (item: any) => item.close_approach_date >= toDatestring(new Date())
  //     ),
  //   },
  //   approaches: data.close_approach_data.map((entry: any) => ({
  //     date: entry.close_approach_date,
  //     velocity: entry.relative_velocity.kilometers_per_second,
  //     miss_distance: {
  //       km: entry.miss_distance.kilometers,
  //       lunar: entry.miss_distance.lunar,
  //     },
  //     orbiting_body: entry.orbiting_body,
  //   })),
  // }
  return (
    <main>
      <LoadedAsteroid data={json.data} />
    </main>
  )
}

const AsteroidPage: MyFC<PageProps<"/asteroid/[id]">> = (props) => {
  return (
    <Suspense>
      <Cached {...props} />
    </Suspense>
  )
}

export default AsteroidPage
