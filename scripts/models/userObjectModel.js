$.fn.serializeJSON=function() {
  var json = {};
  jQuery.map($(this).serializeArray(), function(n, i){
    json[n['name']] = n['value'];
  });
  return json;
};

$('form').on('submit', function(event) {
  event.preventDefault();
  var userObject = $('form').serializeJSON();
  console.log(userObject);
  return(userObject);
});
