(function(module) {
  var inputController = {};

  inputController.reveal = function() {
    $('main > *').show().filter('#dev-bio-page').hide();
  };

  module.inputController = inputController;
})(window);
