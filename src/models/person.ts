import { DataTypes, Model, Sequelize } from 'sequelize'

export const sequelize = new Sequelize(process.env.DB_CONNECTION)

export const Person = sequelize.define<
  Model<{ name: string; age: number }>
>('Person', {
  name: DataTypes.STRING,
  age: DataTypes.INTEGER,
})

export const syncDb = async () => {
  await sequelize.sync()
}
