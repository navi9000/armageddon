import QueryProvider from "@/components/_atoms/query-provider/QueryProvider"
import AsteroidList from "@/components/asteroid-list/AsteroidList"
import type { MyFC } from "@/types"
import { Suspense } from "react"

const Page: MyFC<PageProps<"/">> = async () => {
  return (
    <QueryProvider>
      <Suspense>
        <AsteroidList />
      </Suspense>
    </QueryProvider>
  )
}

export default Page
