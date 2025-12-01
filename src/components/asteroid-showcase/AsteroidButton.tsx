"use client"

import type { MyFC } from "@/types"
import type { Asteroid_v2 } from "@/types/api"
import { Button } from "../_atoms"
import styles from "./AsteroidButton.module.css"
import useAsteroid from "@/features/cart/useAsteroid"

const AsteroidButton: MyFC<{ data: Asteroid_v2 }> = ({ data }) => {
  const { isInCart, addItem } = useAsteroid(data.asteroid.id)

  return isInCart ? (
    <Button className={styles.button} disabled>
      В корзине
    </Button>
  ) : (
    <Button className={styles.button} onClick={addItem}>
      Заказать
    </Button>
  )
}

export default AsteroidButton
