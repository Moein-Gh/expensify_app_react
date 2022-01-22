import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import pets from './data/pets.js'
import User from './models/userModel.js'
import Order from './models/orderModel.js'
import Pet from './models/petModel.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Pet.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const samplePets = pets.map((pet) => {
      return { ...pet, user: adminUser }
    })

    await Pet.insertMany(samplePets)
    console.log('Data Imported'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Pet.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
