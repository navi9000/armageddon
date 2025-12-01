import useTEMP_cartContext from "./useTEMP_cartContext"

export default function useAsteroid(id: string) {
  const { isInCart, addItem } = useTEMP_cartContext()

  return {
    isInCart: isInCart(id),
    addItem: () => addItem(id),
  }
}
