(function ($) {
	"use strict";
    $.fn.lightbox = function() {
        var padding = 50;
        var resizeRatio, wHeight, wWidth, iHeight, iWidth;
        
        function SetupImage (img) {
            wHeight = $(window).height() - padding;
            wWidth = $(window).width() - padding;
            img.width('');
            img.height('');
            iHeight = img[0].height;
            iWidth = img[0].width;
            if(iWidth > wWidth)
            {
                resizeRatio = wWidth / iWidth;
                iWidth = wWidth;
                iHeight = Math.round(iHeight * resizeRatio);
            }
            if(iHeight > wHeight)
            {
                resizeRatio = wHeight / iHeight;
                iHeight = wHeight;
                iWidth = Math.round(iWidth * resizeRatio);
            }
            img.width(iWidth);
            img.height(iHeight);
            img.css({
                "top": ($('#lightboxOverlay').height()-$(img).outerHeight() - 10)/2+"px",
                "left": ($('#lightboxOverlay').width()-$(img).outerWidth() - 10)/2+"px"
            });
        }

        function CloseLightbox () {
            $('#lightboxOverlay').html('').fadeToggle('fast');
            $('body').removeClass('blurred');
        }
      
        $(this).click(function (e) {
            e.preventDefault();
            if($("#lightboxOverlay").length === 0)
            {
                $("body").append('<div id="lightboxOverlay" style="display:none" ></div>');
            }
        
            var img = $('<img src="'+$(this).attr('href')+'" />');
        
            var loadImage = function()
            {
                SetupImage(img);
                $('#lightboxOverlay').append(img);
            };
            
            $("body").addClass("blurred");
            $('#lightboxOverlay').fadeIn('slow');
            $(img).load(function()
            {
                loadImage();
            });
        });
      
        $(window).resize(function() {
            if($('#lightboxOverlay img').length === 0)
            {
                return;
            }
            SetupImage($('#lightboxOverlay img'));
        });
        
        $(document).keydown(function (e) {
            if (e.keyCode === 27)
            {
                CloseLightbox();
            }
        });
        
        $('#lightboxOverlay').live('click', function () {
            CloseLightbox();
        });
    };
})(jQuery);