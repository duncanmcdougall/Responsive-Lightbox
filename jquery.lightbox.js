(function ($) {

  'use strict';

  $.fn.lightbox = function () {
	 var self;
	 var padding = 50;
	 var resizeRatio, wHeight, wWidth, iHeight, iWidth;

	 function SetupImage(img) {
		wHeight = $(window).height() - padding;
		wWidth = $(window).width() - padding;
		img.width('');
		img.height('');
		iHeight = img[0].height;
		iWidth = img[0].width;
		if (iWidth > wWidth) {
		  resizeRatio = wWidth / iWidth;
		  iWidth = wWidth;
		  iHeight = Math.round(iHeight * resizeRatio);
		}
		if (iHeight > wHeight) {
		  resizeRatio = wHeight / iHeight;
		  iHeight = wHeight;
		  iWidth = Math.round(iWidth * resizeRatio);
		}
		img.width(iWidth).height(iHeight);
		img.css({
		  'top': ($('.lightbox').height() - $(img).outerHeight() - 10) / 2 + 'px',
		  'left': ($('.lightbox').width() - $(img).outerWidth() - 10) / 2 + 'px'
		});
	 }

	 function CloseLightbox() {
		$(document).off('keydown'); // Unbind all key events each time the lightbox is closed
		$('.lightbox').html('').fadeOut(function () {
		  $(this).remove();
		});
		$('body').removeClass('blurred');
	 }

	 $(this).click(function (e) {
		self = $(this);
		e.preventDefault();
		if ($('.lightbox').length === 0) {
		  $('body').append('\
  <div class="lightbox" style="display:none;">\
  <a href="#" class="close-lightbox">Close</a>\
  <div class="lightbox-nav">\
	 <a href="#" class="lightbox-previous">previous</a>\
	 <a href="#" class="lightbox-next">next</a>\
  </div>\
  </div>\
  ');
		  // Add click state on overlay background only
		  $('.lightbox').on('click', function (e) {
			 if (this === e.target) {
				CloseLightbox();
			 }
		  });

		  var nextImage = function () {
			 self.parents('li').next().find('a').click();
			 if ($('.lightbox img').length) {
				CloseLightbox();
			 }
		  }

		  var previousImage = function () {
			 self.parents('li').prev().find('a').click();
			 if ($('.lightbox img').length) {
				CloseLightbox();
			 }
		  }

		  // Previous click
		  $('.lightbox').on('click', '.lightbox-previous', function () {
			 previousImage();
			 return false;
		  });

		  // Next click
		  $('.lightbox').on('click', '.lightbox-next', function () {
			 nextImage();
			 return false;
		  });

		  // Close click
		  $('.lightbox').on('click', '.close-lightbox', function () {
			 CloseLightbox();
			 return false;
		  });

		  // Bind Keyboard Shortcuts
		  $(document).on('keydown', function (e) {
			 // Close lightbox with ESC
			 if (e.keyCode === 27) {
				CloseLightbox();
			 }
			 // Go to next image pressing the right key
			 if (e.keyCode === 39) {
				nextImage();
			 }

			 // Go to previous image pressing the left key
			 if (e.keyCode === 37) {
				previousImage();
			 }
		  });

		} // end lightbox check

		$('.lightbox img').remove(); // remove all images in lightbox (if any)

		var img = $('<img src="' + self.attr('href') + '">');

		function loadImage() {
		  $('.lightbox').append(img);
		  SetupImage(img);
		};

		$("body").addClass("blurred");
		$('.lightbox').fadeIn().append('<span class="lightbox-loading"></span>');
		$(img).load(function () {
		  $('.lightbox-loading').remove();
		  loadImage();
		});
	 });

	 $(window).resize(function () {
		if ($('.lightbox img').length === 0) {
		  return;
		}
		SetupImage($('.lightbox img'));
	 });

  };
})(jQuery);