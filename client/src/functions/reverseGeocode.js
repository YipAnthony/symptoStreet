import reverse from 'reverse-geocode'

export default function getZipcodeFromLatLong () {
    const longitude = document.getElementById('googleAddress').getAttribute('longitude')
    const latitude = document.getElementById('googleAddress').getAttribute('latitude')
    return reverse.lookup(latitude, longitude, 'us').zipcode
}