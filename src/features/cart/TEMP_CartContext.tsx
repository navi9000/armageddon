import { createContext } from "react"

export default createContext<{
  count: number
  addItem: (id: string) => void
  isInCart: (id: string) => boolean
} | null>(null)
