import type { Asteroid_v2 } from "@/types/api"
import { createContext, RefObject } from "react"
import Queue from "@/features/queue"

export default createContext<{
  list: RefObject<Asteroid_v2[]>
  observer: RefObject<Queue>
  addItem: (item: Asteroid_v2) => void
  clearCart: () => void
} | null>(null)
