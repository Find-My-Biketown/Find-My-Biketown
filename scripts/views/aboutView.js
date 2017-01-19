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

// I like that you applied some of what we had in class here, but this maybe isn't
// the best use case for an ajax call. The data in your about is going to be the same
// for the most part. So here I likely would have just had the objects in an array in
// your code somewhere.
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
