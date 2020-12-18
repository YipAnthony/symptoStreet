// I created this just to add the redfin houses into my mongoDB cluster
const House = require('../models/house')

// read redfin json file
const fs = require('fs')
const redfinHouses = JSON.parse(fs.readFileSync('redfinHomes.json', 'utf8'))

// connect mongoose
const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://Testuser1:123123123@cluster0.tbbjq.mongodb.net/symptoStreet?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


let houses = []

function houseCreate(houseObject) {

  let house = new House(
    {
      saleType: houseObject.saleType,
      propertyType: houseObject.propertyType,
      address: houseObject.address,
      zipcode: Number(houseObject.zipcode),
      price: Number(houseObject.price),
      beds: Number(houseObject.beds),
      baths: Number(houseObject.baths),
      location: houseObject.location,
      sqft: Number(houseObject.sqft),
      yearBuilt: Number(houseObject.yearBuilt),
      dollarPerSqft: Number(houseObject.dollarPerSqft),
      url: houseObject.url,
      latitude: Number(houseObject.latitude),
      longitude: Number(houseObject.longitude)
    }
  )

  house.save(function (err) {
    if (err) {
      return console.log(err)
    }
  
    console.log('New House:' + houseObject.address)
    houses.push(house)
  })
}

for (const house in redfinHouses) {
  if (redfinHouses.hasOwnProperty(house)) {
    houseCreate(redfinHouses[house])
  }
}

