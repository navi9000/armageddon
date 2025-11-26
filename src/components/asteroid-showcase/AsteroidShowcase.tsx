"use client"

import { NASA_API_ROOT, NASA_API_KEY } from "@/config/constants"

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
}> = ({ id }) => {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetchItem(
      NASA_API_ROOT.concat("/neo/", id, "?api_key=", NASA_API_KEY)
    ).then((res) => setData(res))
  }, [])

  console.log({ data })
  if (!data) {
    return <div>"Loading..."</div>
  }

  return <div>AsteroidShowcase</div>
}

export default AsteroidShowcase
