import type { MyFC } from "@/types"
import { ROOT_URL } from "@/config/constants"
import LoadedAsteroid from "@/components/asteroid-showcase/LoadedAsteroid"
import { cacheLife } from "next/cache"
import { Suspense } from "react"
import { fetchAsteroidById } from "@/helpers/requests"

const Cached: MyFC<PageProps<"/asteroid/[id]">> = async ({ params }) => {
  "use cache"
  cacheLife("hours")

  const { id } = await params
  const data = await fetchAsteroidById(id)

  return (
    <main>
      <LoadedAsteroid data={data} />
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
