"use client"

import type { MyFC } from "@/types"
import type { Asteroid_v2 } from "@/types/api"
import Image from "next/image"
import styles from "./Asteroid.module.css"
import { readableDate } from "@/helpers/dates"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import clsx from "clsx"
import type { CSSProperties } from "react"
import AsteroidButton from "./AsteroidButton"

const getDiameter = (
  distance: Asteroid_v2["approaches"][number]["miss_distance"],
  measurement: "km" | "lunar"
) => {
  switch (measurement) {
    case "km":
      return `${Number(distance.km).toFixed(0)} км`
    case "lunar":
      return `${Number(distance.lunar).toFixed(0)} лунных орбит`
    default:
      return ""
  }
}

const AsteroidCard: MyFC<{
  data: Asteroid_v2
  hasButton?: boolean
  className?: string
  style?: CSSProperties
}> = ({ data, hasButton = false, className, style }) => {
  const distance = useSearchParams().get("distance")
  const measurement =
    distance === "km" ? "km" : distance === "lunar" ? "lunar" : "km"
  const isLarge = data.asteroid.diameter > 100
  const isHazardous = data.asteroid.is_hazardous
  const hasBottomRow = hasButton || isHazardous

  return (
    <div className={clsx(styles.card, className)} style={style}>
      <p className={styles.date}>
        {readableDate(
          data.approaches[data.asteroid.nearest_approach_index].date
        )}
      </p>
      <div className={styles.content}>
        <div className={styles.distancecolumn}>
          <p className={styles.distance}>
            {getDiameter(
              data.approaches[data.asteroid.nearest_approach_index]
                .miss_distance,
              measurement
            )}
          </p>
          <div className={styles.distancearrowcontainer}>
            <Image
              src="/img/arrow.svg"
              alt="arrow"
              className={styles.distancearrow}
              fill
            />
          </div>
        </div>
        <Image
          src="/img/asteroid.png"
          alt="asteroid"
          width={isLarge ? 36 : 22}
          height={isLarge ? 40 : 24}
        />
        <div>
          <Link href={`/asteroid/${data.asteroid.id}`} className={styles.name}>
            {data.asteroid.name}
          </Link>
          <p className={styles.diameter}>
            Ø {data.asteroid.diameter.toFixed(2)}м
          </p>
        </div>
      </div>
      {hasBottomRow && (
        <div className={styles.buttoncontainer}>
          {hasButton && <AsteroidButton id={data.asteroid.id} />}
          {isHazardous && <div className={styles.hazardous}>⚠ Опасен</div>}
        </div>
      )}
    </div>
  )
}

export default AsteroidCard
