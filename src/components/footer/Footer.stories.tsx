import { Meta, StoryObj } from "@storybook/nextjs-vite"
import component from "./Footer"

const meta = {
  component,
  title: "Layouts/Footer",
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof component>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
