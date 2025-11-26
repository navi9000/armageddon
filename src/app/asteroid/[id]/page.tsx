import AsteroidShowcase from "@/components/asteroid-showcase/AsteroidShowcase"
import { MyFC } from "@/types"

const AsteroidPage: MyFC<PageProps<"/asteroid/[id]">> = async ({ params }) => {
  const { id } = await params
  return (
    <main>
      <AsteroidShowcase id={id} />
    </main>
  )
}

export default AsteroidPage
