// Create google address search API on initial page render
let autocomplete;
function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('googleAddress'),
    {
      types: ['address'],
      componentRestrictions: {'country': ['us']},
      fields: ['place_id', 'geometry', 'name']
    }
  )
  autocomplete.addListener('place_changed', onPlaceChanged)
}

function onPlaceChanged() {
  var place = autocomplete.getPlace();

  if (!place.geometry) {
    document.getElementById('googleAddress').placeholder = 'Search an address'
  } else {
    // The API didn't integrate well with React, so I ended up having to assign longitude/latitude data
    // to custom attributes to retrieve later 
    document.getElementById('googleAddress').setAttribute('latitude', place.geometry.location.lat()) 
    document.getElementById('googleAddress').setAttribute('longitude', place.geometry.location.lng())  
    document.getElementById('googleAddress').setAttribute('resultName', place.name)  
  }
}