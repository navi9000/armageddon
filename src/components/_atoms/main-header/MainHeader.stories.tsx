import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import component from "./MainHeader"

const meta = {
  component,
  title: "Atoms/MainHeader",
} satisfies Meta<typeof component>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Main Header",
  },
}
