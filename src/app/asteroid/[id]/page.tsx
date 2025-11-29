import type { MyFC } from "@/types"
import { ROOT_URL } from "@/config/constants"
import LoadedAsteroid from "@/components/asteroid-showcase/LoadedAsteroid"
import { cacheLife } from "next/cache"

const AsteroidPage: MyFC<PageProps<"/asteroid/[id]">> = async ({ params }) => {
  "use cache"
  cacheLife("hours")

  const { id } = await params
  const res = await fetch(ROOT_URL.concat("/api/asteroids/", id))

  if (!res.ok) {
    return <main>Error</main>
  }

  const data = await res.json()
  return (
    <main>
      <LoadedAsteroid data={data.data} />
    </main>
  )
}

export default AsteroidPage
