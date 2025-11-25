import { Meta, StoryObj } from "@storybook/nextjs-vite"
import component from "./Asteroid"
import { Asteroid } from "@/types/api"
import CartProvider from "@/features/cart/CartProvider"
import { useSearchParams } from "next/navigation"
import { mocked } from "storybook/test"

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

const meta = {
  title: "Modules/AsteroidCard",
  component,
  beforeEach: async () => {
    mocked(useSearchParams).mockReturnValue({
      get: () => null,
    } as any)
  },
  decorators: [
    (Child) => (
      <CartProvider>
        <Child />
      </CartProvider>
    ),
  ],
} satisfies Meta<typeof component>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data,
    hasButton: true,
  },
}

export const DefaultLongDistance: Story = {
  args: {
    ...Default.args,
    data: {
      ...data,
      close_approach_data: [
        {
          ...data.close_approach_data[0],
          miss_distance: {
            kilometers: 999999999,
            lunar: 999999999,
          },
        },
      ],
    },
  },
}

export const DefaultLarge: Story = {
  args: {
    ...Default.args,
    data: {
      ...data,
      estimated_diameter: {
        meters: {
          estimated_diameter_min: 200,
          estimated_diameter_max: 250,
        },
      },
    },
  },
}

export const DefaultHazardous: Story = {
  args: {
    ...Default.args,
    data: {
      ...data,
      is_potentially_hazardous_asteroid: true,
    },
  },
}

export const DefaultLunar: Story = {
  args: {
    ...Default.args,
  },
  beforeEach: async () => {
    mocked(useSearchParams).mockReturnValue({
      get: () => "lunar",
    } as any)
  },
}

export const DefaultInCart: Story = {
  args: {
    ...Default.args,
  },
  decorators: [
    (Child) => (
      <CartProvider _list={[data]}>
        <Child />
      </CartProvider>
    ),
  ],
}

export const NoButton: Story = {
  args: {
    ...Default.args,
    hasButton: false,
  },
}

export const NoButtonHazardous: Story = {
  args: {
    ...NoButton.args,
    data: {
      ...data,
      is_potentially_hazardous_asteroid: true,
    },
  },
}
