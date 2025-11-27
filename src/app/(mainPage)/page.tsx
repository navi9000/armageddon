import QueryProvider from "@/components/_atoms/query-provider/QueryProvider"
import AsteroidList from "@/components/asteroid-list/AsteroidList"
import type { MyFC } from "@/types"
import { NASA_API_ROOT, NASA_API_KEY, ROOT_URL } from "@/config/constants"

const Page: MyFC<PageProps<"/">> = async () => {
  let testData
  try {
    const testRes = await fetch(ROOT_URL.concat("/api/get-list/2025-11-27"))
    testData = testRes.ok ? await testRes.json() : testRes.statusText
  } finally {
    return (
      <QueryProvider>
        <AsteroidList
          apiRoot={NASA_API_ROOT}
          apiKey={NASA_API_KEY}
          _test={testData}
        />
      </QueryProvider>
    )
  }
}

export default Page
