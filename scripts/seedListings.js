import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Listing from '../models/Listing.js'
import data from '../data/listings.json'

dotenv.config()

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('🗄 Connected to MongoDB')

    const docs = data.map((item, i) => ({
      ...item,
      featured: i < 8
    }))

    await Listing.deleteMany({})
    await Listing.insertMany(docs)

    console.log('🌱 Seed complete—inserted', docs.length, 'docs')
  } catch (err) {
    console.error('❌ Error seeding:', err)
  } finally {
    await mongoose.disconnect()
    console.log('🔌 Disconnected')
  }
}

seed()
