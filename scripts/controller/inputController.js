(function(module) {
  var inputController = {};

  inputController.reveal = function() {
    $('main > *').show().filter('#dev-bio-page, .bike-station-list').hide();
  };

  module.inputController = inputController;
})(window);
