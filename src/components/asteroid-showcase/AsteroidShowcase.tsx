"use client"

import { MyFC } from "@/types"
import { Asteroid } from "@/types/api"
import { useEffect, useState } from "react"
import styles from "./AsteroidShowcase.module.css"
import LoadedAsteroid from "./LoadedAsteroid"

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

const AsteroidShowcase: MyFC<{
  id: string
  apiRoot: string
  apiKey: string
}> = ({ id, apiRoot, apiKey }) => {
  const [data, setData] = useState<Asteroid | null>(null)

  useEffect(() => {
    fetchItem(apiRoot.concat("/neo/", id, "?api_key=", apiKey)).then((res) =>
      setData(res)
    )
  }, [])

  if (!data) {
    return <div className={styles.asteroid}>Загрузка...</div>
  }

  return <LoadedAsteroid data={data} />
}

export default AsteroidShowcase
