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
    geocodeAddress(geocoder, map);
  });
};

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
      console.log(loc);
      user.userObject.lat = loc[0];
      user.userObject.lon = loc[1];
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
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
<<<<<<< HEAD
};*/
//Auto-Complete coordinates
