let autocomplete;
function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('address'),
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
    document.getElementById('address').placeholder = 'Search an address'
  } else {
    console.log(place.geometry.location.lat(), place.geometry.location.lng() )
  }
}