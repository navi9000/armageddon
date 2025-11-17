import { MyFC } from "@/types"
import { Button } from "@/components/_atoms"
import styles from "./Cart.module.css"

const Cart: MyFC<{ count: number }> = ({ count }) => {
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
      <Button className={styles.button} disabled={!count}>
        Отправить
      </Button>
    </aside>
  )
}

export default Cart
