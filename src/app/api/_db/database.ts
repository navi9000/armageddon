import { Sequelize, Model, DataTypes } from "sequelize"

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
})

class CartItem extends Model {}

CartItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
    },
    asteroidId: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, modelName: "cartItem" }
)

sequelize.sync()

export { CartItem }
