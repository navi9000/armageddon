import useCartContext from "./useCartContext"

export default function useAsteroid(id: string) {
  const { isInCart, addItem } = useCartContext()

  return {
    isInCart: isInCart(id),
    addItem: () => addItem(id),
  }
}
