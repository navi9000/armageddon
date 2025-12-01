import QueryProvider from "@/components/_atoms/query-provider/QueryProvider"
import AsteroidList from "@/components/asteroid-list/AsteroidList"
import type { MyFC } from "@/types"
import { Suspense } from "react"
import styles from "./page.module.css"
import MainHeader from "@/components/_atoms/main-header/MainHeader"
import UnitPicker from "@/components/unit-picker"
import Cart from "@/components/_modules/cart/Cart"
import database from "./api/_db/database"
import { cacheTag } from "next/cache"
import TEMP_CartProvider from "@/features/cart/TEMP_CartProvider"

const Page: MyFC<PageProps<"/">> = async () => {
  "use cache"
  cacheTag("cart")

  const data = database.getByUser("1")

  return (
    <TEMP_CartProvider initialData={data}>
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
    </TEMP_CartProvider>
  )
}

export default Page
