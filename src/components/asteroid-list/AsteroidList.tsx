"use client"

import { MyFC } from "@/types"
import { Asteroid_v2 } from "@/types/api"
import { Suspense, useEffect, useRef } from "react"
import AsteroidCard from "../_modules/asteroid/Asteroid"
import { useInfiniteQuery } from "@tanstack/react-query"
import { toDatestring } from "@/helpers/dates"
import { useVirtualizer } from "@tanstack/react-virtual"
import styles from "./AsteroidList.module.css"
import { fetchAsteroidList } from "@/helpers/requests"

const AsteroidList: MyFC = () => {
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["asteroid-list"],
    queryFn: (ctx) => fetchAsteroidList(ctx.pageParam),
    getNextPageParam: (prevItem) => prevItem.next,
    initialPageParam: toDatestring(new Date()),
  })

  const flatList = (data?.pages.flatMap((page) =>
    Object.entries(page.asteroidList).map(([_, item]) => item)
  ) ?? []) as Asteroid_v2[]

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
    return <div>Загрузка...</div>
  }

  if (status === "error") {
    return <div>Ошибка</div>
  }

  return (
    <div ref={parentRef} className={styles.parent}>
      <div
        className={styles.listcontainer}
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        <Suspense>
          {rowVirtualizer.getVirtualItems()?.map((virtualItem) => (
            <AsteroidCard
              key={virtualItem.key}
              className={styles.item}
              style={{ transform: `translateY(${virtualItem.start}px)` }}
              data={flatList[virtualItem.index]}
              hasButton
            />
          ))}
        </Suspense>
      </div>
    </div>
  )
}

export default AsteroidList
