(function(module) {
  var aboutView = {};

  aboutView.toHtml = function (context){
    var source = $('#bio-template').html(); // grab the template

    var template = Handlebars.compile(source); // compile the template
    var compile = template(context); // pass data to the template

    // move this to view/controller?
    $('.dev-bio-articles').html(compile); // add the compiled html to the page
  };

// this will probably be moved eventually
  //aboutView.loadAboutPage = function (callback){
  $.ajax('/data/devBios.json',{
    method: 'GET',
    success: function(response){
      localStorage.setItem('devBios', JSON.stringify(response));
      console.log('response is: ', response);
    },
    error: function(response){
      alert('error ', response);
    }
  });//end ajax
  //};//end aboutView.loadAboutPage
// So the ajax call gets the data locally, or from the app source, then sets it to localStorage, then will be able to be pulled down to render the about bios

  //aboutView.loadAboutPage();
  module.aboutView = aboutView;
})(window);
