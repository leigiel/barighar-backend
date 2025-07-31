import mongoose from 'mongoose'

const listingSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  price:        { type: Number, required: true },
  type:         { type: String, enum: ["Rent","Sale"], required: true },
  location:     { type: String, required: true },
  size:         { type: String },
  bedrooms:     { type: Number },
  bathrooms:    { type: Number },
  roomTypes:    [{ type: String }],
  amenities:    [{ type: String }],
  description:  { type: String },
  postedBy:     { type: String },
  available:    { type: Boolean, default: true },
  featured:     { type: Boolean, default: false }
}, { timestamps: true })

const Listing = mongoose.model('Listing', listingSchema)

export default Listing
