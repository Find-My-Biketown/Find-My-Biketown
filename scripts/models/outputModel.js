'use strict';
(function(module) {
  var output = {};

  output.bikeStationsArr = []; // the array of bike station objects
  output.bikeStationsArrWithDistance = []; // copy of bikeStationsArr with added distance property

// Call the Biketown API to grab station info, specifically lat/long coordinates. Other possibilities: name, number of bikes available.
// And possibly store it, an array of objects, in local storage?
  output.requestBikeStations = function() {
    $.getJSON('/bikedata')
    .done(function(responseData, message, xhr) {
      //try and keep console.logs like this in your development version and out of the final.
      console.log('responseData is: ', responseData);
      console.log('message is: ', message);
      console.log('xhr is: ', xhr);
      output.bikeStationsArr = responseData.data.stations; // the array of bike station objects
      // Copy the bike station array of objects with .map() and add a distance property
      output.bikeStationsArrWithDistance = output.bikeStationsArr.map(function(curObj){
        var rtnObj = {};
        rtnObj.name = curObj.name;
        rtnObj.address = curObj.address;
        rtnObj.lat = curObj.lat;
        rtnObj.lon = curObj.lon;
        rtnObj.distanceFromUser = '';

        return rtnObj;
      });
      output.calcDistanceFromUserAndSort();
      callBikeMarkers(output.bikeStationsArrWithDistance);
//output.bikeStationsArrWithDistance is calculated
      output.renderBikeStationsList(output.bikeStationsArrWithDistance);
    })
    //.done(callback)
    .fail(function(){
      alert('Biketown API request failed!');
    });
  };

// Create a function to calculate the distance between the user’s address and each Biketown station
// The Haversine formula to calculate distance 'as the crow flies.'

// this is a bit of a personal decision but personally I'd tend to try for less arguments in a function
// when I start to get up toward 3 or 4 arguments. So in this case I would opt to pass in the two objects
// and get the properties off of them inside the function. Even better this is a great use case for ES6
// destructuring. That would allow you to pass in two objects and have the necessary values available as
// arguments.
  output.getDistanceFromLatLonInMiles = function(lat1,lon1,lat2,lon2) {
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

    function deg2rad(deg) {
      return deg * (Math.PI/180);
    }
  };


// Calculate the user's distance to each bike station and sort the array of bike station objects by distance in ascending order
  output.calcDistanceFromUserAndSort = function() {
    output.bikeStationsArrWithDistance.forEach(calcDistanceFromUser);
    output.bikeStationsArrWithDistance.sort(function(a,b){
      return a.distanceFromUser - b.distanceFromUser;
    });
    //the bikeStationsArrWithDistance is complete here

    function calcDistanceFromUser(curStationObj){
      //!!!!!!!!!!!!!!!!!!!!!!!! CHANGE PSEUDO_userObj with appropriate user obj
      curStationObj.distanceFromUser = output.getDistanceFromLatLonInMiles(user.userObject.lat, user.userObject.lon, curStationObj.lat, curStationObj.lon);
      return curStationObj;
    };
  };

// Append the returned array of objects from the distance function (up to a determined amount i.e. 5 indexes) as a list to the view/HTML
  output.renderBikeStationsList = function(arr){
    $('.closest-bike-stations').empty(); // empty any previous contents
    $('.about_app').hide(); // hide the about description
    $('.bike-station-list').show();

    // append the 5 closest bike stations to the page
    for (var i = 0; i < 5; i++) {
      $('.closest-bike-stations').append($('<li>').text(arr[i].name + ' located at ' + arr[i].address));
    }
  };

  module.output = output;
})(window);
