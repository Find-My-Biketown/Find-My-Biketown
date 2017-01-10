'use strict';

(function(module) {
  var output = {};

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
// The function takes user’s address as one argument and an array of objects with the bike station coordinates as the second argument

  // Use the distance formula d=√​(x​2​​−x​1​​)​2​​+(y​2​​−y​1​​)​2​​​​​ to give each distance property a value

  // .sort(compare(a,b) the mapped? array by the distance property, ascending order

  // Return the array of objects

// Append the returned array of objects from the distance function (up to a determined amount i.e. 5 indexes) as a list to the view/HTML


  output.requestBikeStations(); // move this to controller?
  module.output = output;
})(window);
