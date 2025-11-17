export function readableDate(date: string) {
  return new Intl.DateTimeFormat("ru", { dateStyle: "medium" }).format(
    new Date(date)
  )
}
