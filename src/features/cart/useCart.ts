import { useSyncExternalStore } from "react"
import useCartContext from "./useCartContext"

export default function useCart() {
  const { observer, list } = useCartContext()

  const count = useSyncExternalStore(
    (callback) => {
      observer.current.subscribe(callback)
      return () => {
        observer.current.unsubscribe(callback)
      }
    },
    () => list.current.length,
    () => 0
  )

  return {
    count,
  }
}
