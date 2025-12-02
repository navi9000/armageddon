"use server"

import { CartItem } from "@/app/api/_db/database"
import { updateTag } from "next/cache"

export default async function clearCart({ userId }: { userId: string }) {
  try {
    await CartItem.destroy({
      where: {
        userId,
      },
    })

    updateTag("cart")
    return {
      is_success: true,
    }
  } catch {
    return {
      is_success: false,
    }
  }
}
