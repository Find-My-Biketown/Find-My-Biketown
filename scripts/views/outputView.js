function initMap () {
  var centerPoint = {lat: , lng: };
  var map = new google.maps.Map(document.getElementById('map'), {
    center: centerPoint,//users address
    minZoom: '',//minimum zoom level that will be displayed. It will be a number without the quotes.
    maxZoom: '',//maximum zoom level that will be displayed. It will be a number without the quotes.
  });
  var marker = new google.maps.Marker({
    position: centerPoint, //sets position of the marker
    map: map
  });
};
