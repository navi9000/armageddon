import { MyFC } from "@/types"
import styles from "./Header.module.css"
import Link from "next/link"

const Header: MyFC = () => {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        Armageddon 2023
      </Link>
      <p className={styles.desc}>
        ООО “Команда им. Б. Уиллиса”.
        <br />
        Взрываем астероиды с 1998 года.
      </p>
    </header>
  )
}

export default Header
