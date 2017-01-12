(function(module) {
  var aboutController = {};

  welcomeController.reveal = function() {
    // use jquery to grab and hide all the first children of parent main in the main html, filter to select #dev-bio-page, and show it
    $('main > *').hide().filter('#dev-bio-page').show();
  };

  module.aboutController = aboutController;
})(window);
