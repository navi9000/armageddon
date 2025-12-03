"use client"

import { Button } from "@/components/_atoms"
import MainHeader from "@/components/_atoms/main-header/MainHeader"
import { useRouter } from "next/navigation"

const NotFound = () => {
  const { push } = useRouter()
  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <MainHeader>Страница не найдена</MainHeader>
      <br />
      <Button onClick={() => push("/")}>Вернуться на главную</Button>
    </main>
  )
}

export default NotFound
