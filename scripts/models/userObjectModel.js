/*(function(module) {*/
  $.fn.serializeObject = function() {
    var userObject = {};
    var serialized = this.serializeArray();
    $.each(serialized, function() {
      if (userObject[this.name] !== undefined) {
        if (!userObject[this.name].push) {
          userObject[this.name] = [userObject[this.name]];
        }
        userObject[this.name].push(this.value || '');
      } else {
        userObject[this.name] = this.value || '';
      }
    });
    return userObject;
  };

  $(function() {
    $('form').submit(function() {
      $('#result').text(JSON.stringify($('form').serializeObject()));
      return false;
    });
  });

//Should this be the file where we also call Geocoder to create a lat/long?

  var geocoder;
  var map;
  function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
      zoom: 8,
      center: latlng
   }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function codeAddress() {
    var address = document.getElementById('id');
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

/*})(window);*/
