import Footer from "@/components/footer/Footer"
import Header from "@/components/header/Header"
import type { MyFC } from "@/types"
import "./reset.css"
import styles from "./layout.module.css"

const GlobalLayout: MyFC<LayoutProps<"/">> = ({ children }) => {
  return (
    <html>
      <body className={styles.body}>
        <Header />
        <div className={styles.maincontainer}>{children}</div>
        <Footer />
      </body>
    </html>
  )
}

export default GlobalLayout
