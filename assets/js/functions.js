var LOG = false;

var UNIVERSE = UNIVERSE || {};

(function($) {

  "use strict";

  UNIVERSE.initialize = {
    init: function() {
      UNIVERSE.initialize.fullScreen();
      UNIVERSE.initialize.parallax();
      UNIVERSE.initialize.touchElements();
      UNIVERSE.initialize.scrollElements();
      UNIVERSE.header.init();
    },

    fullScreen: function() {
			if ( $fullScreenEl.length > 0 ) {
				$fullScreenEl.each( function() {
					var element = $(this),
						scrHeight = $window.height();

          // Get parent full-screen height
					if ( element.parents('.full-screen').length > 0 ) {
            scrHeight = element.parents('.full-screen').height();
          }

					element.css('height', scrHeight);
				});
			}
		},

    parallax: function() {
      $('#splash-wrapper').parallax({imageSrc: './assets/img/city_background.jpg'});
    },

    touchElements: function() {
      if (UNIVERSE.isMobile.any()) {
        $('.reqtouch').addClass('touch');
      } else {
        $('.reqtouch').addClass('nottouch');
      }
    },

    scrollElements: function() {
      $window.scroll(UNIVERSE.header.scroll);
    }
    /*
    // Custom parallax not used, replaced by init.parallax() right now
    windowScroll: function() {
      window.addEventListener('scroll', function(){
        requestAnimationFrame(function(){
          UNIVERSE.slider.sliderParallax();
          // UNIVERSE.slider.sliderElementsFade();
        });
      }, false);
    }*/
  };

  UNIVERSE.header = {

    init: function() {
      $('#nav-toggle').click(UNIVERSE.header.toggleNavSlider);
    },

    onResize: function() {
      if ($window.width() >= 768) {
        $('#navbar .links').removeAttr('style');
        $('#nav-toggle').removeClass('active');
      }
      UNIVERSE.header.scroll(); // Reset opacity
    },

    scroll: function() {
      if ($('#nav-toggle').hasClass('active')) { return; }
      var top = $window.scrollTop();
      if (top > 75 && !$('#navbar').hasClass('opaque')) {
        $('#navbar').addClass('opaque');
      }
      else if (top < 75) {
        $('#navbar').removeClass('opaque');
      }
    },

    toggleNavSlider: function() {
      var $navToggle = $('#nav-toggle'),
        $linksWrapper = $('#navbar .links');
      if ($navToggle.hasClass('active')) {
        $linksWrapper.slideUp(400, function() {
          UNIVERSE.header.scroll();
        });
        $navToggle.removeClass('active');
      }
      else {
        $('#navbar').addClass('opaque');
        $linksWrapper.slideDown(400);
        $navToggle.addClass('active');
      }
    },

    toggleOpaque: function() {
      if ($('#navbar').hasClass('opaque')) {
        $('#navbar').removeClass('opaque');
      }
      else {
        $('#navbar').addClass('opaque');
      }
    }

  };

  UNIVERSE.slider = {

    /*
    // Custom parallax not used, replaced by init.parallax() right now
    // Parallax offset setter called every frame on scroll
    sliderParallax: function() {
  		if( $sliderParallaxEl.length > 0 ) {
        if (!UNIVERSE.isMobile.any()) {
  				var parallaxElHeight = $sliderParallaxEl.outerHeight();

          // After 50 pixels from top, begin parallax translation
  				if( ( parallaxElHeight + 50 ) > $window.scrollTop() ) {
  					if ($window.scrollTop() > 0) { // Not at top
              var parallaxDivisor = 1.5; // 1 = fixed -> numerator = moves completely with scroll
  						var tranformAmount = ($window.scrollTop() / parallaxDivisor ).toFixed(2);
  						$sliderParallaxEl.stop(true, true).transition({ y: tranformAmount }, 0);
  					} else {
  						$sliderParallaxEl.transition({ y: 0 }, 0); // At top
  					}
  				}
        } else {
  				$sliderParallaxEl.transition({ y: 0 }, 0); // No parallax elements
  			}
  		}
  	}*/

  };

  UNIVERSE.isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (UNIVERSE.isMobile.Android() || UNIVERSE.isMobile.BlackBerry() ||
              UNIVERSE.isMobile.iOS() || UNIVERSE.isMobile.Opera() ||
              UNIVERSE.isMobile.Windows());
		}
	};

  UNIVERSE.documentOnResize = {
    init: function() {
      UNIVERSE.initialize.fullScreen(); // Fix full screen elements on resize
      UNIVERSE.header.onResize();
    }
  };

  UNIVERSE.documentOnReady = {
    init: function() {
      if (LOG) console.log("documentOnReady.init();");
      UNIVERSE.initialize.init();
    }
  };

  UNIVERSE.documentOnLoad = {};

  var $window = $(window),
    $body = $('body'),
    $fullScreenEl = $('.full-screen');

  $(document).ready( UNIVERSE.documentOnReady.init );
  $window.load( UNIVERSE.documentOnLoad.init );
  $window.on( 'resize', UNIVERSE.documentOnResize.init );

})(jQuery);
