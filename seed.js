// seed.js (root of /backend)
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import Listing from './models/Listing.js';

dotenv.config();

// __dirname workaround for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load data from /data/listings.json
const dataPath = path.join(__dirname, 'data', 'listings.json');
const listings = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Listing.deleteMany();
    console.log('🧹 Old listings deleted');

    await Listing.insertMany(listings);
    console.log('🌱 Listings seeded successfully');

    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedDB();
