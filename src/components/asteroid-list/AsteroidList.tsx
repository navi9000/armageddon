"use client"

import { MyFC } from "@/types"
import { Asteroid, AsteroidListData } from "@/types/api"
import { useEffect, useRef } from "react"
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

const AsteroidList: MyFC<{ apiRoot: string; apiKey: string; _test: any }> = ({
  apiRoot,
  apiKey,
  _test,
}) => {
  console.log({ _test })
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
    Object.entries(page.near_earth_objects)
      .sort(([a], [b]) => (a > b ? 1 : -1))
      .flatMap(([_, item]) => item)
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
    <div ref={parentRef} className={styles.parent}>
      <div
        className={styles.listcontainer}
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {rowVirtualizer.getVirtualItems()?.map((virtualItem) => (
          <AsteroidCard
            key={virtualItem.key}
            className={styles.item}
            style={{ transform: `translateY(${virtualItem.start}px)` }}
            data={flatList[virtualItem.index]}
            hasButton
          />
        ))}
      </div>
    </div>
  )
}

export default AsteroidList
