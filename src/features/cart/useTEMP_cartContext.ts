import { use } from "react"
import TEMP_CartContext from "./TEMP_CartContext"

export default function useTEMP_cartContext() {
  const context = use(TEMP_CartContext)
  if (!context) {
    throw "no provider"
  }
  return context
}
