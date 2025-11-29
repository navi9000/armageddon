import QueryProvider from "@/components/_atoms/query-provider/QueryProvider"
import AsteroidList from "@/components/asteroid-list/AsteroidList"
import type { MyFC } from "@/types"

const Page: MyFC<PageProps<"/">> = async () => {
  return (
    <QueryProvider>
      <AsteroidList />
    </QueryProvider>
  )
}

export default Page
