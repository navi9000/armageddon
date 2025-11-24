import { MyFC } from "@/types"
import styles from "./MainHeader.module.css"

const MainHeader: MyFC<{ children: string }> = ({ children }) => {
  return <h1 className={styles.h1}>{children}</h1>
}

export default MainHeader
