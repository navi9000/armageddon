// import { Sequelize, Model, DataTypes } from "sequelize"

// const sequelize = new Sequelize({
//   dialect: "sqlite",
// })

// class CartItem extends Model {}

// CartItem.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     userId: {
//       type: DataTypes.STRING,
//     },
//     asteroidId: {
//       type: DataTypes.STRING,
//     },
//   },
//   { sequelize, modelName: "cartItem" }
// )

// sequelize.sync()

type Item = {
  id: number
  userId: string
  asteroidId: string
}

class Database {
  #index = 0
  #items: Item[] = []

  add({ userId, asteroidId }: { userId: string; asteroidId: string }) {
    this.#index = this.#index++

    const newItem = {
      id: this.#index,
      userId,
      asteroidId,
    }
    this.#items.push(newItem)
    return newItem
  }

  getByUser(userId: string) {
    return this.#items.filter((item) => item.userId === userId)
  }

  deleteByUser(userId: string) {
    this.#items = this.#items.filter((item) => item.userId !== userId)
  }
}

// export { CartItem }

export default new Database()
