import mongoose from 'mongoose'
import dotenv from 'dotenv'

import users from './data/users.js'
import products from './data/products.js'

import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    //passing users in createdUsers[]
    const createdUsers = await User.insertMany(users)
    //adminUser is the first item of createdUsers
    const adminUser = createdUsers[0]._id
    //sample products contains products with additional property
    //user: adminUser. using ...(spread) operator
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    //passing sampleProducts to Product
    await Product.insertMany(sampleProducts)

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

//if 2nd item process.argv array is '-d', destory data
if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}