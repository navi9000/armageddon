"use client"

import type { MyFC } from "@/types"
import { type Unit, useOption } from "./utils"
import styles from "./Option.module.css"
import clsx from "clsx"

const Option: MyFC<{ option: Unit }> = ({ option }) => {
  const [isActive, setThis] = useOption(option)

  return (
    <div
      className={clsx(styles.option, {
        [styles.option_active]: isActive,
      })}
      onClick={setThis}
    >
      {option === "km" ? "в километрах" : "в лунных орбитах"}
    </div>
  )
}

export default Option
