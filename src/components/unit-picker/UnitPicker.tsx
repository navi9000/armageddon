import { MyFC } from "@/types"
import styles from "./UnitPicker.module.css"
import Option from "./Option"
import { Suspense } from "react"

const UnitPicker: MyFC = () => {
  return (
    <Suspense>
      <div className={styles.picker}>
        <Option option="km" />
        <hr className={styles.hr} />
        <Option option="lunar" />
      </div>
    </Suspense>
  )
}

export default UnitPicker
