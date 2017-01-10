'use strict';

(function(module) {
  var output = {};


  var PSEUDO_userObj = {address: '1st and Broadway',
    lat: 45.523389,
    lon: -122.680975};

  output.bikeStationsArr = []; // the array of bike station objects
  output.bikeStationsArrWithDistance = []; // copy of bikeStationsArr with added distance property

// Access the validated user’s address object from the input form

// Call the Biketown API to grab station info, specifically lat/long coordinates. Other possibilities: name, number of bikes available.
// And possibly store it, an array of objects, in local storage?
  output.requestBikeStations = function(callback) {
    $.getJSON('http://biketownpdx.socialbicycles.com/opendata/station_information.json')
    .done(function(responseData, message, xhr) {
      output.bikeStationsArr = responseData.data.stations; // the array of bike station objects

      // Copy the bike station array of objects with .map() and add a distance property
      output.bikeStationsArrWithDistance = output.bikeStationsArr.map(function(curObj){
        var rtnObj = {};
        rtnObj.name = curObj.name;
        rtnObj.address = curObj.address;
        rtnObj.lat = curObj.lat;
        rtnObj.lon = curObj.lon;
        rtnObj.distanceFromUser = null;

        return rtnObj;
      });

    })
    .done(callback);
  };

// Create a function to calculate the distance between the user’s address and each Biketown station
// The Haversine formula to calculate distance 'as the crow flies.'
  function getDistanceFromLatLonInMiles(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    var dMiles = d * 0.621371; // distance in miles
    return dMiles;
  }

  function deg2rad(deg) {
    return deg * (Math.PI/180);
  }

// Calculate the user's distance to each bike station
  function calcDistanceFromUser(){
    output.bikeStationsArrWithDistance.forEach(function(curStationObj){
      curStationObj.distanceFromUser = getDistanceFromLatLonInMiles(PSEUDO_userObj.lat, PSEUDO_userObj.lon, curStationObj.lat, curStationObj.lon);
      return curStationObj;
    });
  };

  // .sort(compare(a,b) the mapped? array by the distance property, ascending order

  // Return the array of objects

// Append the returned array of objects from the distance function (up to a determined amount i.e. 5 indexes) as a list to the view/HTML

  output.requestBikeStations(calcDistanceFromUser); // move this to controller?

  module.output = output;
})(window);
