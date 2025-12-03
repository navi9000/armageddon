import useCartContext from "./useCartContext"

export default function useCart() {
  const { count } = useCartContext()

  return {
    count,
  }
}
