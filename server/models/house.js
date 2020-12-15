const mongoose = require('mongoose')
const Schema = mongoose.Schema

const houseSchema = new Schema(
    {
        saleType: {type: String},
        propertyType: {type: String},
        address: {type: String},
        zipcode: {type: Number},
        price: {type: Number},
        beds: {type: Number},
        baths: {type: Number},
        location: {type: String},
        sqft: {type: Number},
        yearBuilt: {type: Number},
        dollarPerSqft: {type: Number},
        url: {type: String},
        latitude: {type: Number},
        longitude: {type: Number},
    }
)

module.exports = mongoose.model( 'House', houseSchema )