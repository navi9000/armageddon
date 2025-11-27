import { MyFC } from "@/types"
import { Asteroid } from "@/types/api"
import { useEffect, useState } from "react"
import styles from "./AsteroidShowcase.module.css"
import Image from "next/image"
import { Button } from "../_atoms"
import { readableDate } from "@/helpers/dates"
import useAsteroid from "@/features/cart/useAsteroid"

const Approach: MyFC<Asteroid["close_approach_data"][number]> = ({
  close_approach_date,
  relative_velocity: { kilometers_per_second },
  miss_distance: { kilometers },
  orbiting_body,
}) => {
  return (
    <li className={styles.approach}>
      <p>
        <span>Дата:</span> {readableDate(close_approach_date)}
      </p>
      <p>
        <span>Отн. скорость:</span> {Number(kilometers_per_second).toFixed(0)}
        км/с
      </p>
      <p>
        <span>До Земли:</span> {Number(kilometers).toFixed(0)}км
      </p>
      <p>
        <span>Орбита:</span> {orbiting_body}
      </p>
    </li>
  )
}

const LoadedAsteroid: MyFC<{ data: Asteroid }> = ({ data }) => {
  const { isInCart, addAsteroid } = useAsteroid(data)
  return (
    <div className={styles.asteroid}>
      <div className={styles.titlecontainer}>
        <Image src="/img/asteroid.png" alt="asteroid" width={36} height={40} />
        <h1 className={styles.title}>{data.name}</h1>
      </div>
      <div className={styles.asteroidinfocontainer}>
        <div className={styles.diameter}>
          Ø {data.estimated_diameter.meters.estimated_diameter_min.toFixed(2)}м
        </div>
        {data.is_potentially_hazardous_asteroid && (
          <div className={styles.hazardous}>⚠ Опасен</div>
        )}
      </div>

      <h2>Сближения</h2>
      <ul className={styles.list}>
        {data.close_approach_data.map((approach) => (
          <Approach key={approach.close_approach_date} {...approach} />
        ))}
      </ul>

      {isInCart ? (
        <Button className={styles.button} disabled>
          В корзине
        </Button>
      ) : (
        <Button className={styles.button} onClick={addAsteroid}>
          Заказать
        </Button>
      )}
    </div>
  )
}

export default LoadedAsteroid
