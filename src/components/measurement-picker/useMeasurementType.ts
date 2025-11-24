import { useSearchParams } from "next/navigation"

const OPTIONS = ["km", "lunar"] as const
const defaultOption = OPTIONS[0]

export default function useMeasurementType() {
  const distance = useSearchParams().get("distance")
  const index = OPTIONS.findIndex((option) => option === distance)
  if (index !== -1) {
    return OPTIONS[index]
  }
  return defaultOption
}
