"use client"

import { MyFC } from "@/types"
import { Asteroid, AsteroidListData } from "@/types/api"
import { use, useEffect, useRef, useState, cache } from "react"
import AsteroidCard from "../_modules/asteroid/Asteroid"
import { useInfiniteQuery } from "@tanstack/react-query"
import { toDatestring } from "@/helpers/dates"
import { useVirtualizer } from "@tanstack/react-virtual"
import styles from "./AsteroidList.module.css"

async function fetchList(url: string) {
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

const AsteroidList: MyFC<{ apiRoot: string; apiKey: string }> = ({
  apiRoot,
  apiKey,
}) => {
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["asteroid-list"],
    queryFn: (ctx) => fetchList(ctx.pageParam),
    getNextPageParam: (prevItem) => prevItem.links.next,
    initialPageParam: apiRoot.concat(
      "/feed?start_date=",
      toDatestring(new Date()),
      "&api_key=",
      apiKey
    ),
  })

  const flatList = (data?.pages.flatMap((page) =>
    Object.values(page.near_earth_objects).flatMap((item) => item)
  ) ?? []) as Asteroid[]

  const parentRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: flatList.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 130.32 + 32,
  })

  useEffect(() => {
    if (status !== "success") {
      return
    }

    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse()

    if (lastItem.index >= flatList.length - 1 && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [
    flatList.length,
    status,
    fetchNextPage,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ])

  if (status === "pending") {
    return <div>Loading...</div>
  }

  if (status === "error") {
    return <div>Error</div>
  }

  return (
    <div
      ref={parentRef}
      style={{ maxHeight: "400px", overflow: "auto", position: "relative" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {rowVirtualizer.getVirtualItems()?.map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: `max-content`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <AsteroidCard data={flatList[virtualItem.index]} hasButton />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AsteroidList
