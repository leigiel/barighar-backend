import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ MongoDB connected via Mongoose')
  } catch (error) {
    console.error('❌ Connection error:', error.message)
    process.exit(1)
  }
}

export default connectDB
