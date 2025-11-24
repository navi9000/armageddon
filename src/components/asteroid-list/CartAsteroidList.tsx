"use client"

import { MyFC } from "@/types"
import AsteroidCard from "../_modules/asteroid/Asteroid"
import styles from "./AsteroidList.module.css"
import useCartPage from "@/features/cart/useCartPage"
import { Button } from "@/components/_atoms"
import { useRouter } from "next/navigation"

const CartAsteroidList: MyFC = () => {
  const { list, clearCart } = useCartPage()
  const { push } = useRouter()

  const onClick = () => {
    clearCart()
    push("/")
  }

  return (
    <>
      <ul className={styles.list}>
        {list?.map((asteroid: any, index: number) => (
          <AsteroidCard key={index} data={asteroid} />
        ))}
      </ul>
      <Button onClick={onClick}>Отправить и вернуться</Button>
    </>
  )
}

export default CartAsteroidList
