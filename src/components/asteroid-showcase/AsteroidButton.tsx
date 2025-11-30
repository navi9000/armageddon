"use client"

import useAsteroid from "@/features/cart/useAsteroid"
import type { MyFC } from "@/types"
import type { Asteroid, Asteroid_v2 } from "@/types/api"
import { Button } from "../_atoms"
import styles from "./AsteroidButton.module.css"

const AsteroidButton: MyFC<{ data: Asteroid_v2 }> = ({ data }) => {
  // const { isInCart, addAsteroid } = useAsteroid(data)
  const [isInCart, addAsteroid] = [false, () => {}]
  return isInCart ? (
    <Button className={styles.button} disabled>
      В корзине
    </Button>
  ) : (
    <Button className={styles.button} onClick={addAsteroid}>
      Заказать
    </Button>
  )
}

export default AsteroidButton
