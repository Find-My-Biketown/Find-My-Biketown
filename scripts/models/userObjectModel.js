// $.fn.serializeObject = function() {
//   var userObject = {};
//   var serialized = this.serializeArray();
//   $.each(serialized, function() {
//     if (userObject[this.name] !== undefined) {
//       if (!userObject[this.name].push) {
//         userObject[this.name] = [userObject[this.name]];
//       }
//       userObject[this.name].push(this.value || '');
//     } else {
//       userObject[this.name] = this.value || '';
//     }
//   });
//   return userObject;
// };
//
// $(function() {
//   $('form').submit(function() {
//     $('#result').text(JSON.stringify($('form').serializeObject()));
//     return false;
//   });
// });
$.fn.serializeJSON=function() {
  var json = {};
  jQuery.map($(this).serializeArray(), function(n, i){
    json[n['name']] = n['value'];
  });
  return json;
};

$('form').on('submit', function(event) {
  var userObject = $('form').serializeJSON();
  console.log(userObject);
  return(userObject);
});
