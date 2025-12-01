import type { MyFC } from "@/types"
import styles from "../page.module.css"
import MainHeader from "@/components/_atoms/main-header/MainHeader"

const CartLayout: MyFC<LayoutProps<"/cart">> = ({ children }) => {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <MainHeader>Заказ сформирован!</MainHeader>
        {children}
      </div>
    </main>
  )
}

export default CartLayout
