import QueryProvider from "@/components/_atoms/query-provider/QueryProvider"
import AsteroidList from "@/components/asteroid-list/AsteroidList"
import type { MyFC } from "@/types"
import { Suspense } from "react"
import styles from "./page.module.css"
import MainHeader from "@/components/_atoms/main-header/MainHeader"
import UnitPicker from "@/components/unit-picker"
import Cart from "@/components/_modules/cart/Cart"

const Page: MyFC<PageProps<"/">> = async () => {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <MainHeader>Ближайшие подлеты астероидов</MainHeader>
        <UnitPicker />
        <QueryProvider>
          <Suspense>
            <AsteroidList />
          </Suspense>
        </QueryProvider>
      </div>
      <Cart />
    </main>
  )
}

export default Page
