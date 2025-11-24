import Footer from "@/components/footer/Footer"
import Header from "@/components/header/Header"
import type { MyFC } from "@/types"
import "./reset.css"
import styles from "./layout.module.css"
import CartContext from "@/components/_modules/cart/CartContext"
import CartProvider from "@/components/_modules/cart/CartProvider"

const GlobalLayout: MyFC<LayoutProps<"/">> = ({ children }) => {
  return (
    <html>
      <body className={styles.body}>
        <Header />
        <CartProvider>
          <div className={styles.maincontainer}>{children}</div>
        </CartProvider>
        <Footer />
      </body>
    </html>
  )
}

export default GlobalLayout
