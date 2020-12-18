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
    
    if (!errors.isEmpty()) {
      return next(err)
    }
      
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

      const userBedFilter = req.body.bedsInput
      if (userBedFilter !== "") {
        if (userBedFilter === "4") {
          searchQuery.beds = {"$gte": 4}
        } else {
          searchQuery.beds = {"$gte": userBedFilter[0], "$lte": userBedFilter[1]}
        }
      }
      
      const userBathFilter = req.body.bathsInput
      if (userBathFilter !== "") {
        if (userBathFilter === "4") {
          searchQuery.baths = {"$gte": 4}
        } else {
          searchQuery.baths = {"$gte": userBathFilter[0], "$lte": userBathFilter[1]}
        }
      }
      
      if (!!req.body.sqftInputMin) {
        searchQuery.sqft = {}
        searchQuery.sqft["$gte"] = req.body.sqftInputMin
      }
      if (!!req.body.sqftInputMax) {
        if (!searchQuery.sqft) searchQuery.sqft = {}
        searchQuery.sqft["$lte"] = req.body.sqftInputMax
      }

      if(!!req.body.priceInputMin) {
        searchQuery.price = {}
        searchQuery.price["$gte"] = req.body.priceInputMin
      }
      if(!!req.body.priceInputMax) {
        if (!searchQuery.price) searchQuery.price = {}
        searchQuery.price["$lte"] = req.body.priceInputMax
      }

      if (req.body.address !== "") searchQuery.address = {"$regex":req.body.address, "$options": "i"} 
    
    // Search MongoDB with user inputted query
    const searchOutput = await House.find(searchQuery)
      .sort([['price', req.body.priceSort]]) //sort results based on price
    res.json(searchOutput)
  }
]);

module.exports = router;
