(function(module) {
  var user = {};

  user.userObject = {};
  //it's cool that you're adding a plugin here! For one small application, though
  //this may haved been a little heavy handed
  $.fn.serializeJSON=function() {
    var json = {};
    jQuery.map($(this).serializeArray(), function(n, i){
      json[n['name']] = n['value'];
    });
    return json;
  };

  $('form').on('submit', function(event) {
    event.preventDefault();
    user.userObject = $('form').serializeJSON(); // create a user object from the form submission
    user.userObject.lat = '';
    user.userObject.lon = '';
    // ^^^^^^^^^^^ CALCULATE actual lat/lon above

    // make API call to Biketown stations and calculate closest bike stations to user
    output.requestBikeStations();

    return(user.userObject);
  });

  module.user = user;
})(window);
