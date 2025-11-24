import AsteroidShowcase from "@/components/asteroid-showcase/AsteroidShowcase"
import { NASA_API_KEY, NASA_API_ROOT } from "@/config/constants"
import { MyFC } from "@/types"

const AsteroidPage: MyFC<PageProps<"/asteroid/[id]">> = async ({ params }) => {
  const { id } = await params
  return (
    <main>
      <AsteroidShowcase id={id} apiKey={NASA_API_KEY} apiRoot={NASA_API_ROOT} />
    </main>
  )
}

export default AsteroidPage
