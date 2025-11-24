"use client"

async function fetchItem(url: string) {
  const match = await caches.match(url)
  if (match) {
    return match.json()
  }
  const res = await fetch(url)
  if (!res.ok) {
    throw "Not ok"
  }
  const CACHE_NAME = "Armageddon"
  const cache = await caches.open(CACHE_NAME)
  cache.put(url, res.clone())
  return res.json()
}

import { MyFC } from "@/types"
import { useEffect, useState } from "react"

const AsteroidShowcase: MyFC<{
  id: string
  apiRoot: string
  apiKey: string
}> = ({ id, apiRoot, apiKey }) => {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetchItem(apiRoot.concat("/neo/", id, "?api_key=", apiKey)).then((res) =>
      setData(res)
    )
  }, [])

  console.log({ data })
  if (!data) {
    return <div>"Loading..."</div>
  }

  return <div>AsteroidShowcase</div>
}

export default AsteroidShowcase
