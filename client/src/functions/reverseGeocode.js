import reverse from 'reverse-geocode'

export default getZipcodeFromLatLong = (latitude, longitude) => {
    return reverse.lookup(latitude, longitude, 'us').zipcode
}