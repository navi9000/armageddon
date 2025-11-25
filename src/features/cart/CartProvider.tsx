"use client"

import type { MyFC } from "@/types"
import CartContext from "./CartContext"
import { useRef, type PropsWithChildren } from "react"
import type { Asteroid } from "@/types/api"
import Queue from "@/features/queue"

const CartProvider: MyFC<PropsWithChildren<{ _list?: Asteroid[] }>> = ({
  children,
  _list = [],
}) => {
  const list = useRef<Asteroid[]>(_list)
  const observer = useRef(new Queue())

  const addItem = (item: Asteroid) => {
    list.current.push(item)
    observer.current.notify()
  }

  const clearCart = () => {
    list.current = []
    observer.current.notify()
  }

  const value = {
    list,
    observer,
    addItem,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
