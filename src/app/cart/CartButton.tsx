"use client"

import clearCart from "@/actions/clearCart"
import { Button } from "@/components/_atoms"
import { useRouter } from "next/navigation"

const CartButton = () => {
  const { push } = useRouter()

  const onClick = async () => {
    await clearCart({ userId: "1" })
    push("/")
  }
  return <Button onClick={onClick}>Отправить и вернуться</Button>
}

export default CartButton
