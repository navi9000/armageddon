import type { Asteroid } from "@/types/api"
import { createContext, RefObject } from "react"
import Queue from "@/features/queue"

export default createContext<{
  list: RefObject<Asteroid[]>
  observer: RefObject<Queue>
  addItem: (item: Asteroid) => void
  clearCart: () => void
} | null>(null)
