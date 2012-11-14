(function($){

    $.fn.lightbox = function() {
        var padding = 50;
        
        function SetupImage(img)
        {
            var wHeight = $(window).height() - padding;
            var wWidth = $(window).width() - padding;
            img.width('');
            img.height('');
            var iHeight = img[0].height;
            var iWidth = img[0].width;
    
            if(iWidth > wWidth)
            {
                var resizeRatio = wWidth / iWidth;
                iWidth = wWidth;
                iHeight = Math.round(iHeight * resizeRatio);
            }
        
            if(iHeight > wHeight)
            {
                var resizeRatio = wHeight / iHeight;
                iHeight = wHeight;
                iWidth = Math.round(iWidth * resizeRatio);
            }
        
            img.width(iWidth);
            img.height(iHeight);
            
            img.css({
                "top": ($('#dm-lightbox').height()-$(img).outerHeight() - 10)/2+"px",
                "left": ($('#dm-lightbox').width()-$(img).outerWidth() - 10)/2+"px"
            });
        }
      
        $(this).click(function(e)
        {
            e.preventDefault();
            if($("#dm-lightbox").length == 0)
            {
                $("body").append('<div id="dm-lightbox" style="display:none" ></div>');
                $('#dm-lightbox').click(function()
                {
                    $(this).html('');
                    $(this).fadeToggle('fast');
                    $('body').removeClass('blurred');
                });
            }
        
            var img = $('<img src="'+$(this).attr('href')+'" />');
        
            var loadImage = function()
            {
                SetupImage(img);
                $('#dm-lightbox').append(img);
            };
            
            $("body").addClass("blurred");
            $('#dm-lightbox').fadeIn('slow');
            $(img).load(function()
            {
                loadImage();
            });
        });
      
        $(window).resize(function()
                 {
                     if($('#dm-lightbox img').length == 0)
                     {
                        return;   
                     }
                     SetupImage($('#dm-lightbox img'));
                 });
    };
    
})(jQuery);