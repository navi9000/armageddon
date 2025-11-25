import { MyFC } from "@/types"
import styles from "./UnitPicker.module.css"
import Option from "./Option"

const UnitPicker: MyFC = () => {
  return (
    <div className={styles.picker}>
      <Option option="km" />
      <hr className={styles.hr} />
      <Option option="lunar" />
    </div>
  )
}

export default UnitPicker
