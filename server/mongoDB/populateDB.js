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

// import image scraper
const { getData } = require('./scraper')

let houses = []

// Add image source to loaded redfinHouses object
// async function addImageSrc (url) {
//     return await getData(url)
//     console.log(srcURL)
//     return srcURL
// }

async function houseCreate(houseObject) {

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
      imageURL: houseObject.imageURL,
      latitude: Number(houseObject.latitude),
      longitude: Number(houseObject.longitude)
    }
  )

  house.save(function (err) {
    if (err) {
      return console.log(err)
    }
  
    console.log('New House:' + houseObject.address + ' ImgSrc:' + houseObject.imageURL)
    houses.push(house)
  })
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}  

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

async function addToMongoDB() {
  await sleep(10000)
  for (const house in redfinHouses) {
    if (redfinHouses.hasOwnProperty(house)) {
      console.log(redfinHouses[house].url)
      const src = await getData(redfinHouses[house].url)
      console.log(src)
      redfinHouses[house].imageURL = src
      const randomDelay = getRandomInt(10) * 1000  + 30000//random delay, 30 seconds + 1-10 seconds
      await(sleep(randomDelay))
      console.log(redfinHouses[house].imageURL)
      await houseCreate(redfinHouses[house])
    }
  }
}

addToMongoDB();
