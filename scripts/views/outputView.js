var markers = [];
var userMarkers = [];
var map;
function initMap () {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 45.5231, lng: -122.6765},
    //the starting center point before the user inputs a specific address
    //minZoom: 10,//minimum zoom level that will be displayed. It will be a number without the quotes.
    //maxZoom: 20,//maximum zoom level that will be displayed. It will be a number without the quotes.
    mapTypeId: 'roadmap',
    fullscreenControl: true
  });
  window.bikeMap = map;
  var input = document.getElementById('street_address');
  var autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.bindTo('bounds', map);
  //pulls the geocoder and declares a new goecoding instance
  console.log(map);
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
    output.requestBikeStations(callBikeMarkers, bikeMap);
  });
}
function geocodeAddress(geocoder, resultsMap) {
  var address = $('#street_address').val() + $('#zip').val();
  var loc = [];
  console.log(address);
  //grabbing the specified address the user has given
  geocoder.geocode({'address': address},
  function(results, status) {
  //turning the address into lat/long for google to render onto the map. Making sure the status is okay
    //deleteMarkers();
    if (status === 'OK') {
      loc[0]=results[0].geometry.location.lat();
      loc[1]=results[0].geometry.location.lng();

      resultsMap.setCenter(results[0].geometry.location);
      //set the center for the speicified address
      if (userMarkers.length) {
        userMarkers.forEach(function(marker) {marker.setMap(null);});
      }
      var marker = new google.maps.Marker({
        icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        map: resultsMap,
        position: results[0].geometry.location,
      });
      userMarkers.push(marker);
      //biketown stand markers
      user.userObject.lat = loc[0];
      user.userObject.lon = loc[1];
    }
  });
};

function callBikeMarkers (arr) {
  if (markers.length) {
    markers.forEach(function(marker) {marker.setMap(null);});
  }
  for (var i = 0; i < 5; i++) {
    var pos = {lat: arr[i].lat, lng: arr[i].lon};

    markers[i] = new google.maps.Marker({
      position: pos,
      map: bikeMap,
      icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
      //description: output.bikeStationsArrWithDistance[i].desc,
      id: i
    });
  };
};
