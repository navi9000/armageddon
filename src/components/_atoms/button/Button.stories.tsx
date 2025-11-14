import { Meta, StoryObj } from "@storybook/nextjs-vite"
import component from "./Button"

const meta = {
  component,
  title: "Atoms/Button",
} satisfies Meta<typeof component>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: "default",
    children: "Default",
  },
}

export const DefaultDisabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
}

export const Card: Story = {
  args: {
    variant: "card",
    isSelected: false,
    children: "Order",
  },
}

export const CardSelected: Story = {
  args: {
    variant: "card",
    isSelected: true,
    children: "In cart",
  },
}
