import { Resolve } from "@/types"
import { ComponentProps } from "react"

type ButtonVariantUnion = "default" | "card"
type ButtonVariant<T extends ButtonVariantUnion> = Extract<
  ButtonVariantUnion,
  T
>

interface DefaultButton {
  variant?: ButtonVariant<"default">
  isSelected?: never
}

interface CardButton {
  variant: ButtonVariant<"card">
  isSelected: boolean
}

type ButtonUnion = DefaultButton | CardButton

export type ButtonProps = Resolve<ButtonUnion & ComponentProps<"button">>
