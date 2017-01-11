(function(module) {
  var aboutView = {};

  aboutView.toHtml = function (context){
    var source = $('#bio-template').html(); // grab the template

    var template = Handlebars.compile(source); // compile the template
    var compile = template(context); // pass data to the template

    // move this to view/controller?
    $('.dev-bio-articles').html(compile); // add the compiled html to the page
  };

  module.aboutView = aboutView;
})(window);
