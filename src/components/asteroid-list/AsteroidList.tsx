"use client"

import { MyFC } from "@/types"
import { AsteroidListData } from "@/types/api"
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
  // const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
  //   queryKey: ["asteroids"],
  //   queryFn: (ctx) => fetchList(ctx.pageParam),
  //   getNextPageParam: (lastGroup) => {
  //     console.log({ lastGroup })
  //     return lastGroup.links.next
  //   },
  //   initialPageParam: apiRoot.concat(
  //     "/feed?start_date=",
  //     toDatestring(new Date()),
  //     "&api_key=",
  //     apiKey
  //   ),
  // })

  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetchList(
      apiRoot.concat(
        "/feed?start_date=",
        toDatestring(new Date()),
        "&api_key=",
        apiKey
      )
    ).then((res) => {
      console.log({ res: Object.values(res.near_earth_objects) })
      setData(Object.values(res.near_earth_objects).flatMap((item) => item))
    })
  }, [])

  console.log({ data })

  // const parentRef = useRef<HTMLDivElement>(null)

  // const allRows = data
  //   ? data?.pages.flatMap((page) => {
  //       console.log({ page })
  //       return Object.values(page.near_earth_objects).flatMap((item) => item)
  //     })
  //   : []

  // console.log({ allRows })

  // const rowVirtualizer = useVirtualizer({
  //   count: allRows.length,
  //   getScrollElement: () => parentRef.current,
  //   estimateSize: () => 136,
  // })

  // useEffect(() => {
  //   const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse()
  //   if (!lastItem) {
  //     return
  //   }

  //   if (lastItem.index >= allRows.length - 1 && !isFetchingNextPage) {
  //     fetchNextPage()
  //   }
  // }, [
  //   fetchNextPage,
  //   allRows.length,
  //   isFetchingNextPage,
  //   rowVirtualizer.getVirtualItems(),
  // ])

  return (
    <ul className={styles.list}>
      {data?.map((asteroid: any, index: number) => (
        <AsteroidCard key={index} data={asteroid} hasButton />
      ))}
    </ul>
  )

  // return (
  //   <div ref={parentRef}>
  //     <ul
  //       style={{
  //         height: `max-content`,
  //         width: "100%",
  //         position: "relative",
  //       }}
  //     >
  //       {rowVirtualizer.getVirtualItems().map((virtualRow) => {
  //         const asteroid: any = allRows[virtualRow.index]
  //         const isLoaderRow = virtualRow.index > allRows.length - 1

  //         return isLoaderRow ? (
  //           <li key={virtualRow.key}>Loading...</li>
  //         ) : (
  //           <li
  //             key={virtualRow.key}
  //             style={{
  //               position: "absolute",
  //               top: 0,
  //               left: 0,
  //               width: "100%",
  //               height: `${virtualRow.size}px`,
  //               transform: `translateY(${virtualRow.start}px)`,
  //             }}
  //           >
  //             <AsteroidCard
  //               data={asteroid}
  //               variant="default"
  //               measurement="km"
  //             />
  //           </li>
  //         )
  //       })}
  //     </ul>
  //   </div>
  // )
}

export default AsteroidList
