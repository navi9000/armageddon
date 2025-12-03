"use client"

import { MyFC } from "@/types"
import {
  PropsWithChildren,
  useState,
  useEffect,
  useOptimistic,
  startTransition,
} from "react"
import CartContext from "./CartContext"
import addToCart from "@/actions/addToCart"

const CartProvider: MyFC<
  PropsWithChildren<{ initialData: { asteroidId: string }[] }>
> = ({ children, initialData }) => {
  const [asteroidIdList, setAsteroidIdList] = useState<string[]>(
    initialData.map((item) => item.asteroidId)
  )

  useEffect(() => {
    setAsteroidIdList(initialData.map((item) => item.asteroidId))
  }, [initialData])

  const [optimisticAsteroidList, addOptimisticItem] = useOptimistic(
    asteroidIdList,
    (prev, newId: string) => [...prev, newId]
  )

  const addItem = async (asteroidId: string) => {
    const data = { userId: "1", asteroidId }

    startTransition(() => {
      addOptimisticItem(asteroidId)
      addToCart(data)
    })
  }

  const isInCart = (asteroidId: string) => {
    return optimisticAsteroidList.includes(asteroidId)
  }

  const value = {
    count: optimisticAsteroidList.length,
    addItem,
    isInCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
