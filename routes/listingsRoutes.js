const express = require('express');
const router = express.Router();
const {
  getListings,
  createListing
} = require('../controllers/listingControllers');

router.get('/', getListings);       // GET /api/listings
router.post('/', createListing);    // POST /api/listings

module.exports = router;
