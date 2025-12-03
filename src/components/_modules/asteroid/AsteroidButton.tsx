import { Button } from "@/components/_atoms"
import { MyFC } from "@/types"
import useAsteroid from "@/features/cart/useAsteroid"

const AsteroidButton: MyFC<{ id: string }> = ({ id }) => {
  const { isInCart, addItem } = useAsteroid(id)

  return (
    <Button variant="card" isSelected={isInCart} onClick={addItem}>
      {isInCart ? "в корзине" : "заказать"}
    </Button>
  )
}

export default AsteroidButton
