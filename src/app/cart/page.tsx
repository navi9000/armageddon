import { MyFC } from "@/types"
import { CartItem } from "../api/_db/database"
import { ROOT_URL } from "@/config/constants"
import { Asteroid_v2 } from "@/types/api"
import AsteroidCard from "@/components/_modules/asteroid/Asteroid"
import CartButton from "./CartButton"
import styles from "@/components/asteroid-list/AsteroidList.module.css"
import { cacheTag } from "next/cache"

const Page: MyFC<PageProps<"/cart">> = async () => {
  "use cache"
  cacheTag("cart")

  const data = await CartItem.findAll({
    where: {
      userId: "1",
    },
  }).then((res) => res.map((item) => item.dataValues))

  const asteroidList = await Promise.all(
    data.map((item) =>
      fetch(ROOT_URL.concat("/api/asteroids/", item.asteroidId))
        .then((res) => res.json())
        .then((res): Asteroid_v2 => res.data)
    )
  )

  return (
    <div className={styles.parent}>
      <div className={styles.listcontainer}>
        {asteroidList?.map((asteroid, index: number) => (
          <AsteroidCard key={index} data={asteroid} />
        ))}
      </div>
      <CartButton />
    </div>
  )
}

export default Page
