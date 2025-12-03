import type { MyFC } from "@/types"
import { ROOT_URL } from "@/config/constants"
import LoadedAsteroid from "@/components/asteroid-showcase/LoadedAsteroid"
import { cacheLife, cacheTag } from "next/cache"
import { PropsWithChildren, Suspense } from "react"
import { CartItem } from "@/app/api/_db/database"
import TEMP_CartProvider from "@/features/cart/CartProvider"

const Cached: MyFC<PageProps<"/asteroid/[id]">> = async ({ params }) => {
  "use cache"
  cacheLife("hours")

  const { id } = await params
  const res = await fetch(ROOT_URL.concat("/api/asteroids/", id))

  if (!res.ok) {
    return <main>Error</main>
  }

  const json = await res.json()

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
