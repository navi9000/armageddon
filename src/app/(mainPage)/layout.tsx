import MainHeader from "@/components/_atoms/main-header/MainHeader"
import type { MyFC } from "@/types"
import styles from "./layout.module.css"
import Cart from "@/components/_modules/cart/Cart"
import UnitPicker from "@/components/unit-picker"

const MainPageLayout: MyFC<LayoutProps<"/">> = ({ children }) => {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <MainHeader>Ближайшие подлеты астероидов</MainHeader>
        <UnitPicker />
        {children}
      </div>
      <Cart />
    </main>
  )
}

export default MainPageLayout
