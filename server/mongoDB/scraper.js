// Image scraping
const axios = require("axios").default;
const htmlparser2 = require('htmlparser2')


const fethHtml = async url => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch {
    console.error(
      `ERROR: An error occurred while trying to fetch the URL: ${url}`
    );
  }
};
const cheerio = require('cheerio')

const imageScrape = async (url) => {
  const options = {
    xmlMode: true,
    decodeEntities: true, // Decode HTML entities.
    withStartIndices: false, // Add a `startIndex` property to nodes.
    withEndIndices: false, // Add an `endIndex` property to nodes.
  }

  const html = await fethHtml(url);
  const selector = cheerio.load(html)
  const searchResults = selector(".InlinePhotoPreview")
    .find("img")
    .attr('src')

  return searchResults
};

const getData = async (url) => {
    const imageURLOutput = await imageScrape(url)
    console.log(imageURLOutput)
    return imageURLOutput

    // .then(data => {
    //     console.log(data)
    //     return data.value
    // })
    // .catch(error => {
    //     console.log(error)
    // })
}

// console.log(getData('http://www.redfin.com/CA/San-Francisco/757-N-Point-St-94109/unit-4/home/1816724'))

module.exports = { getData }