import QueryProvider from "@/components/_atoms/query-provider/QueryProvider"
import AsteroidList from "@/components/asteroid-list/AsteroidList"
import { NASA_API_KEY, NASA_API_ROOT } from "@/config/constants"
import { MyFC } from "@/types"

const Page: MyFC<PageProps<"/">> = async () => {
  return (
    <QueryProvider>
      <AsteroidList apiRoot={NASA_API_ROOT} apiKey={NASA_API_KEY} />
    </QueryProvider>
  )
}

export default Page
