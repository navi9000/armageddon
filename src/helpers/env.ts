type EnvGetter = {
  <const T extends string[]>(title: string): string
  <const T extends string[]>(title: string, allowedValues: T): T[number]
}

export const env: EnvGetter = (title, allowedValues = undefined) => {
  const value = process.env[title]
  if (!value) {
    throw new Error(`File .env does not exist,
            or it does not contain variable ${title},
            or you may be trying to access a server-only variable ${title} from a client component`)
  }
  if (!Array.isArray(allowedValues)) {
    return value
  }

  const index = allowedValues.indexOf(title)
  if (index === -1) {
    throw new Error(
      `Variable ${title} is not on the list of allowed values, which are ${allowedValues.join(
        ", "
      )}`
    )
  }
  return allowedValues[index]
}
