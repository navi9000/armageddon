export function readableDate(date: string) {
  return new Intl.DateTimeFormat("ru", { dateStyle: "medium" }).format(
    new Date(date)
  )
}

export function toDatestring(date: Date) {
  return date.toISOString().split("T")[0]
}
