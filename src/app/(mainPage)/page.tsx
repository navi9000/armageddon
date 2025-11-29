import QueryProvider from "@/components/_atoms/query-provider/QueryProvider"
import AsteroidList from "@/components/asteroid-list/AsteroidList"
import type { MyFC } from "@/types"
import { NASA_API_ROOT, NASA_API_KEY } from "@/config/serverOnlyConstants"

const Page: MyFC<PageProps<"/">> = async () => {
  return (
    <QueryProvider>
      <AsteroidList apiRoot={NASA_API_ROOT} apiKey={NASA_API_KEY} />
    </QueryProvider>
  )
}

export default Page
