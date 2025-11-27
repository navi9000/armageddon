import AsteroidShowcase from "@/components/asteroid-showcase/AsteroidShowcase"
import type { MyFC } from "@/types"
import { NASA_API_ROOT, NASA_API_KEY } from "@/config/constants"

const AsteroidPage: MyFC<PageProps<"/asteroid/[id]">> = async ({ params }) => {
  const { id } = await params
  return (
    <main>
      <AsteroidShowcase id={id} apiKey={NASA_API_KEY} apiRoot={NASA_API_ROOT} />
    </main>
  )
}

export default AsteroidPage
