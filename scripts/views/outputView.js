var markers = [];
function initMap () {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: 45.5231, lng: -122.6765},
    //the starting center point before the user inputs a specific address
    //minZoom: 10,//minimum zoom level that will be displayed. It will be a number without the quotes.
    //maxZoom: 20,//maximum zoom level that will be displayed. It will be a number without the quotes.
    mapTypeId: 'roadmap',
    fullscreenControl: true
  });
  var input = document.getElementById('street_address');
  var autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.bindTo('bounds', map);
  //pulls the geocoder and declares a new goecoding instance
  console.log(map);
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    console.log('geocode before');
    geocodeAddress(geocoder, map);
    console.log('geocode after');
    output.requestBikeStations(callBikeMarkers, map);
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
      if (markers.length) {
        markers.forEach(function(marker) {marker.setMap(null);});
      }
      var marker = new google.maps.Marker({
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        map: resultsMap,
        position: results[0].geometry.location,
      });
      markers.push(marker);
      //biketown stand markers
      console.log('Im working');
      user.userObject.lat = loc[0];
      user.userObject.lon = loc[1];
    }
  });
};
/*function getCoords(arrayOfStands) {
  var coordinatePair = [output.bikeStationsArrWithDistance.lat, output.bikeStationsArrWithDistance.lon];
  return coordinatePair;
}
function getPins (filteredArray) {
  var pinCoords = output.bikeStationsArrWithDistance.map(getLatLng);
  return pinCoords;
}
function placeAllPins (locationData, map){ //takes a 2d array of coords
  var opts = {};
  var allPins = [];
  console.log('in place all pins ' , locationData);
  locationData.forEach(function(coordinatePair){
    opts = {}; //clear out opts obj
    opts.position = new google.maps.LatLng(coordinatePair[0], coordinatePair[1]); //grabs coordinants from each object and sets the config for each pin
    var marker = new google.maps.Marker(opts); // creats a new pin at coord currently in opt.position
      // adds each marker obj to an array for access
    marker.setMap(map); // places new pin on map
    allPins.push(marker); // add to array for possible later use
  });
  return allPins; // returns array of objs, each obj is a representation of a pin now on the map
}*/


function callBikeMarkers () {
  for (var i = 0; i < output.bikeStationsArrWithDistance.length; i++) {
    var pos = {lat: output.bikeStationsArrWithDistance[i].lat, lng: output.bikeStationsArrWithDistance[i].lon};

    markers[i] = new google.maps.Marker({
      position: pos,
      map: map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      description: output.bikeStationsArrWithDistance[i].desc,
      id: i
    });
  };
};
/*var script = document.createElement('script');
script.src = //whatever the path is to grab the bike stands json data
  document.getElementsByTagName('head')[0].appendChild(script); //requests JSONP directly from the biketown servers by appending a script tag to the head of the document
window.markBikeStands = function(results) {
    //results are the bike stands
    //looping through the results array (bikestand objects) and placing a marker for each one
  for (var i = 0; i < results.features.length; i++) {
    var coords = results.features[i].geometry.coordinates;
    var latLng = new google.maps.LatLng(coords[1], coords[0]);
    var marker = new google.maps.Marker({
      position: latLng, //sets position of the marker
      map: map //we are adding to the map that has already been made
    });
  };
};*/
//Auto-Complete coordinates
