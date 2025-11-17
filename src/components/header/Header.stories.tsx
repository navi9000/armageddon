import { Meta, StoryObj } from "@storybook/nextjs-vite"
import component from "./Header"

const meta = {
  component,
  title: "Layouts/Header",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof component>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
