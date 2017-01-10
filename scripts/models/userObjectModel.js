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
$(document).ready(function() {
  geocoder = new google.maps.Geocoder();
  $('form.geocode').submit(function(e) {
      var that = this;
      var addr;
      var addrArray = [];
      var addrFields = ['street_address', 'city', 'state', 'postal_code', 'country'];
      $(addrFields).each(function(idx, name) {
          var val = $(this).find('input[name="' + name + '"]').val();
          if (val.length) {
              addrArray.push(val);
          }
      });
      if (addrArray.length) {
          e.preventDefault();
          $(that).unbind('submit');
          var onSuccess = function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                  result = results[0].geometry.location;
                  var point = result.lat() + ', ' + result.lng();
                  $(that).prepend('<input type="hidden" name="point" value="' + point + '">');
              }
              $(that).trigger('submit');
          }
          addr = addrArray.join(', ');
          geocoder.geocode({'address': addr}, onSuccess);
      }
  });
});

/*})(window);*/
