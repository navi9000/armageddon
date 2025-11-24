"use client"

import type { MyFC } from "@/types"
import CartContext from "./CartContext"
import { useState, type PropsWithChildren } from "react"

const CartProvider: MyFC<PropsWithChildren> = ({ children }) => {
  const [ids, setIds] = useState<string[]>([])

  const isInCart = (id: string) => {
    return ids.includes(id)
  }

  const addId = (id: string) => {
    setIds((prev) => [...prev, id])
  }

  const clearCart = () => {
    setIds([])
  }

  const value = {
    count: ids.length,
    isInCart,
    addId,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
