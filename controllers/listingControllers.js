import Listing from '../models/Listing.js';

export const getListings = async (req, res) => {
  try {
    const filter = {};

    if (req.query.featured !== undefined) {
      filter.featured = req.query.featured === 'true';
    }

    if (req.query.location) {
      filter.location = { $regex: req.query.location, $options: 'i' };
    }

    if (req.query.type) {
      if (req.query.type === 'for-rent') filter.type = 'Rent';
      else if (req.query.type === 'for-sale') filter.type = 'Sale';
    }

    const listings = await Listing.find(filter);
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching listings' });
  }
};

export const createListing = async (req, res) => {
  try {
    let {
      title,
      location,
      price,
      type,
      status,
      featured,
      size,
      bedrooms,
      bathrooms,
      roomTypes,
      amenities,
      description,
      postedBy,
      available,
    } = req.body;

    // Parse roomTypes and amenities if they come as JSON strings
    if (typeof roomTypes === 'string') {
      roomTypes = JSON.parse(roomTypes);
    }
    if (typeof amenities === 'string') {
      amenities = JSON.parse(amenities);
    }

    // Convert available and featured to boolean
    featured = featured === 'true' || featured === true;
    available = available === undefined ? true : (available === 'true' || available === true);

    const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

    const newListing = new Listing({
      title,
      location,
      price,
      type,
      status,
      featured,
      size,
      bedrooms: bedrooms ? Number(bedrooms) : undefined,
      bathrooms: bathrooms ? Number(bathrooms) : undefined,
      roomTypes,
      amenities,
      description,
      postedBy,
      available,
      image: imagePath,
    });

    await newListing.save();

    res.status(201).json(newListing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create listing' });
  }
};
