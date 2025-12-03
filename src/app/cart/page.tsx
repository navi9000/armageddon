import { MyFC } from "@/types"
import { CartItem } from "../api/_db/database"
import AsteroidCard from "@/components/_modules/asteroid/Asteroid"
import CartButton from "./CartButton"
import styles from "@/components/asteroid-list/AsteroidList.module.css"
import { cacheTag } from "next/cache"
import clsx from "clsx"
import { fetchAsteroidById } from "@/helpers/requests"

const Page: MyFC<PageProps<"/cart">> = async () => {
  "use cache"
  cacheTag("cart")

  const data = await CartItem.findAll({
    where: {
      userId: "1",
    },
  })

  const asteroidList = await Promise.all(
    data.map((item) => fetchAsteroidById(item.dataValues.asteroidId))
  )

  return (
    <div className={clsx(styles.parent, styles.parent_cart)}>
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
