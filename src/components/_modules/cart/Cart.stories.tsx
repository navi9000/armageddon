import { Meta, StoryObj } from "@storybook/nextjs-vite"
import component from "./Cart"
import CartProvider from "@/features/cart/CartProvider"
import { useRouter } from "next/navigation"
import { mocked } from "storybook/test"
import type { Asteroid_v2 } from "@/types/api"

const meta = {
  title: "Modules/Cart",
  component,
  beforeEach: async () => {
    mocked(useRouter).mockReturnValue({
      push: () => alert("pushed"),
    } as any)
  },
} satisfies Meta<typeof component>

export default meta

type Story = StoryObj<typeof meta>

const data: Asteroid_v2 = {
  asteroid: {
    id: "1",
    name: "Ast name",
    is_hazardous: false,
    diameter: 10,
    nearest_approach_index: 0,
  },
  approaches: [
    {
      date: "2027-01-01",
      velocity: "2",
      miss_distance: {
        km: "12",
        lunar: "12",
      },
      orbiting_body: "Earth",
    },
  ],
}

export const EmptyCart: Story = {
  decorators: [
    (Child) => (
      <CartProvider>
        <Child />
      </CartProvider>
    ),
  ],
}

export const FullCart: Story = {
  decorators: [
    (Child) => (
      <CartProvider _list={[data, data]}>
        <Child />
      </CartProvider>
    ),
  ],
}
