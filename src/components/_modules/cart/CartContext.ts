import { createContext } from "react"

export default createContext<{
  count: number
  addId: (id: string) => void
  isInCart: (id: string) => boolean
  clearCart: () => void
} | null>(null)
