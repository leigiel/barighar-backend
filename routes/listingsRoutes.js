import express from 'express';
import { getListings, createListing } from '../controllers/listingControllers.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getListings);
router.post('/', upload.single('image'), createListing);  // multer handles 'image' field

export default router;
