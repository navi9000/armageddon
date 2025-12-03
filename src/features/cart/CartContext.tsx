import { createContext } from "react"

export default createContext<{
  count: number
  addItem: (id: string) => Promise<void>
  isInCart: (id: string) => boolean
} | null>(null)
