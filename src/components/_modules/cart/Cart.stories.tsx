import { Meta, StoryObj } from "@storybook/nextjs-vite"
import component from "./Cart"

const meta = {
  title: "Modules/Cart",
  component,
} satisfies Meta<typeof component>

export default meta

type Story = StoryObj<typeof meta>

export const EmptyCart: Story = {
  args: {
    count: 0,
  },
}

export const FullCart: Story = {
  args: {
    count: 2,
  },
}
