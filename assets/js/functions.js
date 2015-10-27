
var UNIVERSE = UNIVERSE || {};

(function($) {

  "use strict";

  UNIVERSE.initialize = {
    init: function() {

      //UNIVERSE.initialize.stuff1();
    }
  };

  UNIVERSE.header = {};

  UNIVERSE.slider = {};

  UNIVERSE.documentOnResize = {};

  UNIVERSE.documentOnReady = {};

  UNIVERSE.documentOnLoad = {};

  var $window = $(window),
    $body = $('body');

  $(document).ready( UNIVERSE.documentOnReady.init );
  $window.load( UNIVERSE.documentOnLoad.init );
  $window.on( 'resize', UNIVERSE.documentOnResize.init );

})(jQuery);
