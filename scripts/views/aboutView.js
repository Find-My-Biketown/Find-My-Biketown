(function(module) {
  var aboutView = {};

  aboutView.toHtml = function (context){
    var source = $('#bio-template').html(); // grab the template

    var template = Handlebars.compile(source); // compile the template
    var compile = template(context); // pass data to the template

    // move this to view/controller?
    $('.dev-bio-articles').html(compile); // add the compiled html to the page
  };

// !!!!!!!!!!!!!this will probably be moved eventually
// this will happen when the page is loaded
  $.ajax('/data/devBios.json',{
    method: 'GET', // get content of devBios.json
    success: function(response){
      localStorage.setItem('devBios', JSON.stringify(response));
      console.log('response is: ', response);
    },
    error: function(response){
      alert('error ', response);
    }
  });//end ajax

  aboutView.loadAboutPage = function (callback){
    var devBios = JSON.parse(localStorage.getItem('devBios'));
    devBios.forEach(aboutView.toHtml);
  };//end aboutView.loadAboutPage

// So the ajax call gets the data locally, or from the app source, then sets it to localStorage, then will be able to be pulled down to render the about bios

  aboutView.loadAboutPage();
  module.aboutView = aboutView;
})(window);
