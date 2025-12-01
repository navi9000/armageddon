import { Button } from "@/components/_atoms"
import { MyFC } from "@/types"
import addToCart from "@/actions/addToCart"
import useAsteroid from "@/features/cart/useAsteroid"

const AsteroidButton: MyFC<{ id: string }> = ({ id }) => {
  const { isInCart, addItem } = useAsteroid(id)

  const onClick = async () => {
    addItem()
    const res = await addToCart({ userId: "1", asteroidId: id })
  }

  return (
    <Button variant="card" isSelected={isInCart} onClick={onClick}>
      {isInCart ? "в корзине" : "заказать"}
    </Button>
  )
}

export default AsteroidButton
