import { ReactNode } from "react"

export type MyFC<T extends {} = {}> = (
  props: T
) => Exclude<ReactNode, undefined>

export type Resolve<T> = T extends Function ? T : { [K in keyof T]: T[K] }
