"use server"

import { CartItem } from "@/app/api/_db/database"
import { updateTag } from "next/cache"

export default async function addToCart({
  userId,
  asteroidId,
}: {
  userId: string
  asteroidId: string
}) {
  try {
    const cartItem = await CartItem.create({
      userId,
      asteroidId,
    })

    updateTag("cart")

    return {
      is_success: true,
      data: cartItem.dataValues,
    }
  } catch (e) {
    return {
      is_success: false,
      message: "Something went wrong",
    }
  }
}
