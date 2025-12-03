import { MyFC } from "@/types"
import { Approach, Asteroid_v2 } from "@/types/api"
import styles from "./LoadedAsteroid.module.css"
import Image from "next/image"
import { readableDate } from "@/helpers/dates"
import AsteroidButton from "./AsteroidButton"

const ApproachListItem: MyFC<Approach> = ({
  date,
  velocity,
  miss_distance: { km },
  orbiting_body,
}) => {
  return (
    <li className={styles.approach}>
      <p>
        <span>Дата:</span> {readableDate(date)}
      </p>
      <p>
        <span>Отн. скорость:</span> {Number(velocity).toFixed(0)}
        км/с
      </p>
      <p>
        <span>До Земли:</span> {Number(km).toFixed(0)}км
      </p>
      <p>
        <span>Орбита:</span> {orbiting_body}
      </p>
    </li>
  )
}

const LoadedAsteroid: MyFC<{ data: Asteroid_v2 }> = ({
  data: { asteroid, approaches },
}) => {
  return (
    <div className={styles.asteroid}>
      <div className={styles.titlecontainer}>
        <Image src="/img/asteroid.png" alt="asteroid" width={36} height={40} />
        <h1 className={styles.title}>{asteroid.name}</h1>
      </div>
      <div className={styles.asteroidinfocontainer}>
        <div className={styles.diameter}>Ø {asteroid.diameter.toFixed(2)}м</div>
        {asteroid.is_hazardous && (
          <div className={styles.hazardous}>⚠ Опасен</div>
        )}
      </div>

      <h2>Сближения</h2>
      <ul className={styles.list}>
        {approaches.map((approach, index) => (
          <ApproachListItem key={index} {...approach} />
        ))}
      </ul>

      <AsteroidButton data={{ asteroid, approaches }} />
    </div>
  )
}

export default LoadedAsteroid
