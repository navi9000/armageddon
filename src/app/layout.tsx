import Footer from "@/components/footer/Footer"
import Header from "@/components/header/Header"
import type { MyFC } from "@/types"
import "./reset.css"
import styles from "./layout.module.css"
import { PropsWithChildren, Suspense } from "react"
import { cacheTag } from "next/cache"
import { CartItem } from "./api/_db/database"
import TEMP_CartProvider from "@/features/cart/CartProvider"

const CartWrapper: MyFC<PropsWithChildren> = async ({ children }) => {
  "use cache"
  cacheTag("cart")

  const data = await CartItem.findAll({
    where: {
      userId: "1",
    },
  }).then((res) => res.map((item) => item.dataValues))

  return <TEMP_CartProvider initialData={data}>{children}</TEMP_CartProvider>
}

const GlobalLayout: MyFC<LayoutProps<"/">> = ({ children }) => {
  return (
    <html>
      <body className={styles.body}>
        <Header />
        <div className={styles.maincontainer}>
          <Suspense>
            <CartWrapper>{children}</CartWrapper>
          </Suspense>
        </div>
        <Footer />
      </body>
    </html>
  )
}

export default GlobalLayout
