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
  body('bedsInput').trim().escape(),
  body('bathsInput').trim().escape(),
  body('sqftInputMin').trim().escape(),
  body('sqftInputMax').trim().escape(),
  body('priceInputMin').trim().escape(),
  body('priceInputMax').trim().escape(),
  body('address').trim().escape(),
  body('priceSort').trim().escape(),


  async (req, res, next) => {

    // Extract errors
    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
      
      console.log(req.body.sqftInputMin, typeof req.body.sqftInputMax)
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

      if (Number(req.body.bedsInput) !== 0) {
        if (Number(req.body.bedsInput[1]) === 0) {
          searchQuery.beds = {"$gte": req.body.bedsInput[0]}
        } else {
          searchQuery.beds = {"$gte": req.body.bedsInput[0], "$lte": req.body.bedsInput[1]}
        }
      }

      if (Number(req.body.bathsInput) !== 0) {
        if (Number(req.body.bathsInput[1] === 0)) {
          searchQuery.baths = {"$gte": req.body.bathsInput[0]}
        } else {
          searchQuery.baths = {"$gte": req.body.bathsInput[0], "$lte": req.body.bathsInput[1]}
        }
      }
      
      if (Number(req.body.sqftInputMin) !== 0 && Number(req.body.sqftInputMax) !== 0) {
        searchQuery.sqft = {"$gte": req.body.sqftInputMin, "$lte": req.body.sqftInputMax}
      } else {
        if (Number(req.body.sqftInputMin) !== 0) searchQuery.sqft = {"$gte": req.body.sqftInputMin}
        if (Number(req.body.sqftInputMax) !== 0) searchQuery.sqft = {"$lte": req.body.sqftInputMax}
      }

      if (Number(req.body.priceInputMin) !== 0 && Number(req.body.priceInputMax) !== 0) {
        searchQuery.price = {"$gte": req.body.priceInputMin, "$lte": req.body.priceInputMax}
      } else {
        if (Number(req.body.priceInputMin) !== 0) searchQuery.price = {"$gte": req.body.priceInputMin}
        if (Number(req.body.priceInputMax) !== 0) searchQuery.price = {"$lte": req.body.priceInputMax}
      }

      if (req.body.address !== "") searchQuery.address = {"$regex":req.body.address, "$options": "i"} 
      
      // Search MongoDB with user inputted query
      const searchOutput = await House.find(searchQuery).sort([['price', req.body.priceSort]])
      console.log(searchQuery)
      res.json(searchOutput)
    }
  }
]);

module.exports = router;
