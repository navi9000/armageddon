import type { Asteroid } from "@/types/api"
import useCartContext from "./useCartContext"
import { useSyncExternalStore } from "react"

export default function useAsteroid(item: Asteroid) {
  const { addItem, observer, list } = useCartContext()

  const isInCart = useSyncExternalStore(
    (callback) => {
      observer.current.subscribe(callback)

      return () => {
        observer.current.unsubscribe(callback)
      }
    },
    () => list.current.some((listItem) => listItem.id === item.id),
    () => false
  )

  const value = {
    addAsteroid: () => addItem(item),
    isInCart,
  }

  return value
}
