"use client"

import { MyFC } from "@/types"
import { Button } from "@/components/_atoms"
import styles from "./Cart.module.css"
import useCartContext from "./useCartContext"
import { useRouter } from "next/navigation"

const Cart: MyFC = () => {
  const { count } = useCartContext()
  const { push } = useRouter()

  const clickButton = () => {
    push("/cart")
  }
  return (
    <aside className={styles.cart}>
      <div className={styles.info}>
        <p className={styles.title}>Корзина</p>
        {count ? (
          <p className={styles.counter}>{count} астероидов</p>
        ) : (
          <p className={styles.counter}>Пусто</p>
        )}
      </div>
      <Button className={styles.button} disabled={!count} onClick={clickButton}>
        Отправить
      </Button>
    </aside>
  )
}

export default Cart
