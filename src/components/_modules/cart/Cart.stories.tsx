import { Meta, StoryObj } from "@storybook/nextjs-vite"
import component from "./Cart"
import CartProvider from "@/features/cart/CartProvider"
import { useRouter } from "next/navigation"
import { mocked } from "storybook/test"
import type { Asteroid } from "@/types/api"

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

const data: Asteroid = {
  id: "1",
  name: "Ast name",
  estimated_diameter: {
    meters: {
      estimated_diameter_min: 10,
      estimated_diameter_max: 15,
    },
  },
  is_potentially_hazardous_asteroid: false,
  close_approach_data: [
    {
      close_approach_date: "2027-01-01",
      relative_velocity: {
        kilometers_per_second: 2,
      },
      miss_distance: {
        lunar: 12,
        kilometers: 1987,
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
