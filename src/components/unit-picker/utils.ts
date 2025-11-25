import { usePathname, useSearchParams, useRouter } from "next/navigation"
import type { Resolve } from "@/types"

const OPTIONS = ["km", "lunar"] as const
const defaultOption = OPTIONS[0]

export type Unit = (typeof OPTIONS)[number]
type UseOptionResult = [boolean, () => void]

function useSelectedOption() {
  const distance = useSearchParams().get("distance")
  const index = OPTIONS.findIndex((option) => option === distance)
  if (index !== -1) {
    return OPTIONS[index]
  }
  return defaultOption
}

export function useOption(option: Unit): Resolve<UseOptionResult> {
  const selectedOption = useSelectedOption()
  const pathname = usePathname()
  const { replace } = useRouter()

  const isActive = selectedOption === option

  const selectOption = () => {
    replace(pathname.concat(`?distance=${option}`))
  }

  return [isActive, selectOption]
}
