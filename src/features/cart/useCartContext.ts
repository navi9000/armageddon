import { use } from "react"
import CartContext from "./CartContext"

export default function useCartContext() {
  const context = use(CartContext)
  if (!context) {
    throw `useCartContext must be called from within a CartProvider component`
  }

  return context
}
