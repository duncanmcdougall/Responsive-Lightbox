/*!
 * jquery.lightbox.js v1.3
 * https://github.com/duncanmcdougall/Responsive-Lightbox
 * Copyright 2015 Duncan McDougall and other contributors; @license Creative Commons Attribution 2.5
 *
 * Options: 
 * margin - int - default 50. Minimum margin around the image
 * nav - bool - default true. enable navigation
 * blur - bool - default true. Blur other content when open using css filter
 * minSize - int - default 0. Min window width or height to open lightbox. Below threshold will open image in a new tab.
 *
 */
(function ($) {

    'use strict';

    $.fn.lightbox = function (options) {

        var opts = {
            margin: 50,
            nav: true,
            blur: true,
            minSize: 0
        };

        var plugin = {

            items: [],
            lightbox: null,
            image: null,
            current: null,
            locked: false,
            caption: null,
			
            init: function (items) {
                plugin.items = items;
                var id = 'lightbox-' + Math.floor((Math.random() * 100000) + 1);
                if (!plugin.lightbox) {
                    plugin.lightbox = $('body').find('.bodyGlobalLightbox');

                    if(plugin.lightbox.length === 0){
                        $('body').append(
                          '<div id="'+id+'" class="lightbox bodyGlobalLightbox" style="display:none;">'+
                          '<a href="#" class="lightbox__close lightbox__button"></a>' +
                          '<a href="#" class="lightbox__nav lightbox__nav--prev lightbox__button"></a>' +
                          '<a href="#" class="lightbox__nav lightbox__nav--next lightbox__button"></a>' +
                          '<div href="#" class="lightbox__caption"><p></p></div>' +
                          '</div>'
                        );

                        plugin.lightbox = $("#"+id);
                    }

                    plugin.caption = $('.lightbox__caption', plugin.lightbox);
                }

                if (plugin.items.length > 1 && opts.nav) {
                    $('.lightbox__nav', plugin.lightbox).show();
                } else {
                    $('.lightbox__nav', plugin.lightbox).hide();
                }

                plugin.bindEvents();

            },

            loadImage: function () {
                if(opts.blur) {
                    $("body").addClass("blurred");
                }
                $("img", plugin.lightbox).remove();
                plugin.lightbox.fadeIn('fast').append('<span class="lightbox__loading"></span>');

                var img = $('<img src="' + $(plugin.current).attr('href') + '" draggable="false">');

                $(img).load(function () {
                    $('.lightbox__loading').remove();
                    plugin.lightbox.append(img);
                    plugin.image = $("img", plugin.lightbox).hide();
                    plugin.resizeImage();
                    plugin.setCaption();
                });
            },

            setCaption: function () {
                var caption = $(plugin.current).data('caption');
                if(!!caption && caption.length > 0) {
                    plugin.caption.fadeIn();
                    $('p', plugin.caption).text(caption);
                }else{
                    plugin.caption.hide();
                }
            },

            resizeImage: function () {
                var ratio, wHeight, wWidth, iHeight, iWidth;
                wHeight = $(window).height() - opts.margin;
                wWidth = $(window).outerWidth(true) - opts.margin;
                plugin.image.width('').height('');
                iHeight = plugin.image.height();
                iWidth = plugin.image.width();
                if (iWidth > wWidth) {
                    ratio = wWidth / iWidth;
                    iWidth = wWidth;
                    iHeight = Math.round(iHeight * ratio);
                }
                if (iHeight > wHeight) {
                    ratio = wHeight / iHeight;
                    iHeight = wHeight;
                    iWidth = Math.round(iWidth * ratio);
                }

                plugin.image.width(iWidth).height(iHeight).css({
						'top': ($(window).height() - plugin.image.outerHeight()) / 2 + 'px',
						'left': ($(window).width() - plugin.image.outerWidth()) / 2 + 'px'
					}).show();
                plugin.locked = false;
            },

            getCurrentIndex: function () {
                return $.inArray(plugin.current, plugin.items);
            },

            next: function () {
                if (plugin.locked) {
                    return false;
                }
                plugin.locked = true;
                if (plugin.getCurrentIndex() >= plugin.items.length - 1) {
                    $(plugin.items[0]).click();
                } else {
                    $(plugin.items[plugin.getCurrentIndex() + 1]).click();
                }
            },

            previous: function () {
                if (plugin.locked) {
                    return false;
                }
                plugin.locked = true;
                if (plugin.getCurrentIndex() <= 0) {
                    $(plugin.items[plugin.items.length - 1]).click();
                } else {
                    $(plugin.items[plugin.getCurrentIndex() - 1]).click();
                }
            },

            bindEvents: function () {
                $(plugin.items).click(function (e) {
                    if(!plugin.lightbox.is(":visible") && ($(window).width() < opts.minSize || $(window).height() < opts.minSize)) {
                        $(this).attr("target", "_blank");
                        return;
                    }
                    var self = $(this)[0];
                    e.preventDefault();
                    plugin.current = self;
                    plugin.loadImage();

                    // Bind Keyboard Shortcuts
                    $(document).on('keydown', function (e) {
                        // Close lightbox with ESC
                        if (e.keyCode === 27) {
                            plugin.close();
                        }
                        // Go to next image pressing the right key
                        if (e.keyCode === 39) {
                            plugin.next();
                        }
                        // Go to previous image pressing the left key
                        if (e.keyCode === 37) {
                            plugin.previous();
                        }
                    });
                });

                // Add click state on overlay background only
                plugin.lightbox.on('click', function (e) {
                    if (this === e.target) {
                        plugin.close();
                    }
                });

                // Previous click
                $(plugin.lightbox).on('click', '.lightbox__nav--prev', function () {
                    plugin.previous();
                    return false;
                });

                // Next click
                $(plugin.lightbox).on('click', '.lightbox__nav--next', function () {
                    plugin.next();
                    return false;
                });

                // Close click
                $(plugin.lightbox).on('click', '.lightbox__close', function () {
                    plugin.close();
                    return false;
                });

                $(window).resize(function () {
                    if (!plugin.image) {
                        return;
                    }
                    plugin.resizeImage();
                });
            },

            close: function () {
                $(document).off('keydown'); // Unbind all key events each time the lightbox is closed
                $(plugin.lightbox).fadeOut('fast');
                $('body').removeClass('blurred');
            }
        };

        $.extend(opts, options);

        plugin.init(this);
    };

})(jQuery);