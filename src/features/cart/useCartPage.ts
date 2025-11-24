import useCartContext from "./useCartContext"

export default function useCartPage() {
  const { list, clearCart } = useCartContext()

  return {
    list: list.current,
    clearCart,
  }
}
