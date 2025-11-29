"use client"

import useAsteroid from "@/features/cart/useAsteroid"
import type { MyFC } from "@/types"
import type { Asteroid } from "@/types/api"
import { Button } from "../_atoms"
import styles from "./AsteroidButton.module.css"

const AsteroidButton: MyFC<{ data: Asteroid }> = ({ data }) => {
  const { isInCart, addAsteroid } = useAsteroid(data)
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
