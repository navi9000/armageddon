import { use } from "react"
import CartContext from "./CartContext"

export default function useCartContext() {
  const context = use(CartContext)
  if (!context) {
    throw "no provider"
  }
  return context
}
