"use client"

import { MyFC } from "@/types"
import { Button } from "@/components/_atoms"
import styles from "./Cart.module.css"
import { useRouter } from "next/navigation"
import useCart from "@/features/cart/useCart"

const Cart: MyFC = () => {
  const { count } = useCart()
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
