import { Meta, StoryObj } from "@storybook/nextjs-vite"
import component from "./Asteroid"
import { Asteroid } from "@/types/api"

const meta = { title: "Modules/AsteroidCard", component } satisfies Meta<
  typeof component
>

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
      close_approach_date: "2025-11-11",
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

export const Default: Story = {
  args: {
    data,
    variant: "default",
    measurement: "km",
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

export const DefaultLunar: Story = {
  args: {
    ...Default.args,
    measurement: "lunar",
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

export const InCart: Story = {
  args: {
    ...Default.args,
    variant: "incart",
  },
}

export const NoButton: Story = {
  args: {
    ...Default.args,
    variant: "nobutton",
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
