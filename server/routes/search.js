const express = require('express');
const router = express.Router();
const async = require('async')
const House = require('../models/house')
const { body, validationResult } = require('express-validator')
const zipcodes = require('zipcodes')

/* POST search. */
router.post('/', [
  
  // Validate and sanitise fields
  body('zipcode').trim().escape(),
  body('zipcodeRadius').trim().escape(),
  body('bedsMin').trim().escape(),
  body('bedsMax').trim().escape(),
  body('bathsMin').trim().escape(),
  body('bathsMax').trim().escape(),
  body('sqftMin').trim().escape(),
  body('sqftMax').trim().escape(),
  body('priceMin').trim().escape(),
  body('priceMax').trim().escape(),
  body('address').trim().escape(),
  body('priceSort').trim().escape(),

  async (req, res, next) => {

    // Extract errors
    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
      
      
      const searchQuery = {}
      // Add the following paramaters to search query if input by user

      if (Number(req.body.zipcode) !== 0) {
        searchQuery.zipcode = req.body.zipcode
        
        // Generate zipcodes within an x mile radius
        const zipcodesWithinRadius = zipcodes.radius(req.body.zipcode, req.body.zipcodeRadius) 

        if (zipcodesWithinRadius.length > 0) {
          searchQuery.zipcode = {$in: zipcodesWithinRadius}
        }
      } 

      if (Number(req.body.bedsMin) !== 0 && Number(req.body.bedsMax) !== 0) {
        searchQuery.beds = {"$gte": req.body.bedsMin, "$lte": req.body.bedsMax}
      } else {
        if (Number(req.body.bedsMin) !== 0) searchQuery.beds = {"$gte": req.body.bedsMin}
        if (Number(req.body.bedsMax) !== 0) searchQuery.beds = {"$lte": req.body.bedsMax}
      }

      if (Number(req.body.bathsMin) !== 0 && Number(req.body.bathsMax) !== 0) {
        searchQuery.baths = {"$gte": req.body.bathsMin, "$lte": req.body.bathsMax}
      } else {
        if (Number(req.body.bathsMin) !== 0) searchQuery.baths = {"$gte": req.body.bathsMin}
        if (Number(req.body.bathsMax) !== 0) searchQuery.baths = {"$lte": req.body.bathsMax}
      }
      
      if (Number(req.body.sqftMin) !== 0 && Number(req.body.sqftMax) !== 0) {
        searchQuery.sqft = {"$gte": req.body.sqftMin, "$lte": req.body.sqftMax}
      } else {
        if (Number(req.body.sqftMin) !== 0) searchQuery.sqft = {"$gte": req.body.sqftMin}
        if (Number(req.body.sqftMax) !== 0) searchQuery.sqft = {"$lte": req.body.sqftMax}
      }

      if (Number(req.body.priceMin) !== 0 && Number(req.body.priceMax) !== 0) {
        searchQuery.price = {"$gte": req.body.priceMin, "$lte": req.body.priceMax}
      } else {
        if (Number(req.body.priceMin) !== 0) searchQuery.price = {"$gte": req.body.priceMin}
        if (Number(req.body.priceMax) !== 0) searchQuery.price = {"$lte": req.body.priceMax}
      }

      if (req.body.address !== "") searchQuery.address = {"$regex":req.body.address, "$options": "i"} 
      
      // Search MongoDB with user inputted query
      const searchOutput = await House.find(searchQuery).sort([['price', req.body.priceSort]])
      res.json(searchOutput)
    }
  }
]);

module.exports = router;
