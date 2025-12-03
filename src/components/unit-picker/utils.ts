import { usePathname, useSearchParams, useRouter } from "next/navigation"
import type { Resolve } from "@/types"
import { useOptimistic, useTransition } from "react"

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
  const [optimisticOption, setOptimisticOption] = useOptimistic(
    selectedOption,
    (_, newResult: Unit) => newResult
  )
  const [pending, startTransition] = useTransition()

  const isActive = optimisticOption === option

  const selectOption = () => {
    if (pending) {
      return
    }
    startTransition(() => {
      setOptimisticOption(option)
      replace(pathname.concat(`?distance=${option}`))
    })
  }

  return [isActive, selectOption]
}
