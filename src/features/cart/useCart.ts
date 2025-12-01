import useTEMP_cartContext from "./useTEMP_cartContext"

export default function useCart() {
  const { count } = useTEMP_cartContext()

  return {
    count,
  }
}
