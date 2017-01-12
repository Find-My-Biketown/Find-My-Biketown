(function(module) {
  var aboutView = {};

  aboutView.toHtml = function (context){
    var source = $('#bio-template').html(); // grab the template

    var template = Handlebars.compile(source); // compile the template

    var compile = template(context); // pass data to the template

    // return compile;
    // // move this to view/controller?
    $('.dev-bio-articles').append(compile); // add the compiled html to the page
  };

// !!!!!!!!!!!!!this will probably be moved eventually
// this will happen when the page is loaded
  aboutView.loadAboutPage = function (callback){
    if (localStorage.getItem('devBios')){
      var devBios = JSON.parse(localStorage.getItem('devBios'));
      console.log('devBios parsed is: ', devBios);
      devBios.forEach(aboutView.toHtml);
    } else{
      $.ajax('/data/devBios.json',{
        method: 'GET', // get content of devBios.json
        success: function(response){
          localStorage.setItem('devBios', JSON.stringify(response));
          console.log('response is: ', response);
          response.forEach(aboutView.toHtml);
        },
        error: function(response){
          alert('error ', response);
        }
      });
    }
  };//end aboutView.loadAboutPage

// So the ajax call gets the data locally, or from the app source, then sets it to localStorage, then will be able to be pulled down to render the about bios
  aboutView.loadAboutPage();
  module.aboutView = aboutView;
})(window);
