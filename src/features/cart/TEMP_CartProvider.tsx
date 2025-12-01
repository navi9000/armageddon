"use client"

import { MyFC } from "@/types"
import { PropsWithChildren, useState, useEffect } from "react"
import TEMP_CartContext from "./TEMP_CartContext"

const TEMP_CartProvider: MyFC<PropsWithChildren<{ initialData: any[] }>> = ({
  children,
  initialData,
}) => {
  const [asteroidIdList, setAsteroidIdList] = useState<string[]>(
    initialData.map((item) => item.asteroidId)
  )

  useEffect(() => {
    setAsteroidIdList(initialData.map((item) => item.asteroidId))
  }, [initialData])

  const addItem = (id: string) => {
    setAsteroidIdList((prev) => [...prev, id])
  }

  const isInCart = (id: string) => {
    return asteroidIdList.includes(id)
  }

  const value = {
    count: asteroidIdList.length,
    addItem,
    isInCart,
  }

  return (
    <TEMP_CartContext.Provider value={value}>
      {children}
    </TEMP_CartContext.Provider>
  )
}

export default TEMP_CartProvider
