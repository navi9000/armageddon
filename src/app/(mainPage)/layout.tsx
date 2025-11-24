import MainHeader from "@/components/_atoms/main-header/MainHeader"
import type { MyFC } from "@/types"
import styles from "./layout.module.css"
import Cart from "@/components/_modules/cart/Cart"
import MeasurementPicker from "@/components/measurement-picker/MeasurementPicker"

const MainPageLayout: MyFC<LayoutProps<"/">> = ({ children }) => {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <MainHeader>Ближайшие подлеты астероидов</MainHeader>
        <MeasurementPicker />
        {children}
      </div>
      <Cart />
    </main>
  )
}

export default MainPageLayout
