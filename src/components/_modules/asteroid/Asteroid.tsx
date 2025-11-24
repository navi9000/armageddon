"use client"

import { Button } from "@/components/_atoms"
import type { MyFC } from "@/types"
import type { Asteroid } from "@/types/api"
import Image from "next/image"
import styles from "./Asteroid.module.css"
import { readableDate } from "@/helpers/dates"
import { useSearchParams } from "next/navigation"
import useAsteroid from "@/features/cart/useAsteroid"

const getDiameter = (data: Asteroid, measurement: "km" | "lunar") => {
  switch (measurement) {
    case "km":
      return `${Number(
        data.close_approach_data[0].miss_distance.kilometers
      ).toFixed(0)} километров`
    case "lunar":
      return `${Number(data.close_approach_data[0].miss_distance.lunar).toFixed(
        0
      )} лунных орбит`
    default:
      return ""
  }
}

const AsteroidCard: MyFC<{
  data: Asteroid
  // variant: "default" | "incart" | "nobutton"
  hasButton?: boolean
  // measurement: "km" | "lunar"
}> = ({ data, hasButton = false }) => {
  const distance = useSearchParams().get("distance")
  const measurement =
    distance === "km" ? "km" : distance === "lunar" ? "lunar" : "km"
  const isLarge = data.estimated_diameter.meters.estimated_diameter_min > 100
  // const hasButton = variant !== "nobutton"
  // const isSelected = variant === "incart"
  const isHazardous = data.is_potentially_hazardous_asteroid
  const hasBottomRow = hasButton || isHazardous

  const { isInCart, addAsteroid } = useAsteroid(data)

  console.count("render asteroid")

  return (
    <li className={styles.card}>
      <p className={styles.date}>
        {readableDate(data.close_approach_data[0].close_approach_date)}
      </p>
      <div className={styles.content}>
        <div>
          <p className={styles.distance}>{getDiameter(data, measurement)}</p>
          <Image src="/img/arrow.svg" alt="arrow" width={129} height={6} />
        </div>
        <Image
          src="/img/asteroid.png"
          alt="asteroid"
          width={isLarge ? 36 : 22}
          height={isLarge ? 40 : 24}
        />
        <div>
          <p className={styles.name}>{data.name}</p>
          <p className={styles.diameter}>
            Ø {data.estimated_diameter.meters.estimated_diameter_min.toFixed(2)}
            м
          </p>
        </div>
      </div>
      {hasBottomRow && (
        <div className={styles.buttoncontainer}>
          {hasButton && (
            <Button variant="card" isSelected={isInCart} onClick={addAsteroid}>
              {isInCart ? "в корзине" : "заказать"}
            </Button>
          )}
          {isHazardous && <div className={styles.hazardous}>⚠ Опасен</div>}
        </div>
      )}
    </li>
  )
}

export default AsteroidCard
