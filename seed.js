require('dotenv').config();
const mongoose = require('mongoose');
const Listing = require('./models/Listing');
const listings = require('./data/listings.json');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  await Listing.insertMany(listings);
  console.log('✅ Successfully seeded 50 listings!');
  mongoose.disconnect();
});
