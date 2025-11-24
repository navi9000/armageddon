"use client"

import { MyFC } from "@/types"
import useMeasurementType from "./useMeasurementType"
import styles from "./MeasurementPicker.module.css"
import clsx from "clsx"
import { usePathname, useRouter } from "next/navigation"

const MeasurementPicker: MyFC = () => {
  const selectedType = useMeasurementType()
  const pathname = usePathname()
  const router = useRouter()

  const selectMeasurement = (type: typeof selectedType) => {
    router.replace(pathname.concat(`?distance=${type}`))
  }

  return (
    <div className={styles.picker}>
      <div
        className={clsx(styles.option, {
          [styles.option_active]: selectedType === "km",
        })}
        onClick={() => selectMeasurement("km")}
      >
        в километрах
      </div>
      <hr className={styles.hr} />
      <div
        className={clsx(styles.option, {
          [styles.option_active]: selectedType === "lunar",
        })}
        onClick={() => selectMeasurement("lunar")}
      >
        в лунных орбитах
      </div>
    </div>
  )
}

export default MeasurementPicker
