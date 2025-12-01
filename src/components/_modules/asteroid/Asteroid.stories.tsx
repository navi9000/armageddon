import { Meta, StoryObj } from "@storybook/nextjs-vite"
import component from "./Asteroid"
import { Asteroid_v2 } from "@/types/api"
import CartProvider from "@/features/cart/TEMP_CartProvider"
import { useSearchParams } from "next/navigation"
import { mocked } from "storybook/test"

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
      <CartProvider initialData={[]}>
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
      approaches: [
        {
          ...data.approaches[0],
          miss_distance: {
            km: "9999999999999",
            lunar: "99999999999999",
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
      asteroid: {
        ...data.asteroid,
        diameter: 200,
      },
    },
  },
}

export const DefaultHazardous: Story = {
  args: {
    ...Default.args,
    data: {
      ...data,
      asteroid: {
        ...data.asteroid,
        is_hazardous: true,
      },
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
      <CartProvider
        initialData={[
          { asteroidId: data.asteroid.id },
          { asteroidId: data.asteroid.id },
        ]}
      >
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
      asteroid: {
        ...data.asteroid,
        is_hazardous: true,
      },
    },
  },
}
