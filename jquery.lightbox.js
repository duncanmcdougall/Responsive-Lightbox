/*
 * jquery.lightbox.js
 * https://github.com/duncanmcdougall/Responsive-Lightbox
 * Copyright 2013 Duncan McDougall and other contributors; @license Creative Commons Attribution 2.5
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

        // the key of $.data()
        var dataKey = 'plugin-lightbox',

        // default options
            defaults = {
                nav: true,
                className: 'lightbox',
                wrapperClass: 'lightbox-wrapper',
                loadingClass: 'lightbox-loading',
                imgClass: 'lightbox-image',
                closeButtonClass: 'lightbox-close',
                prevButtonClass: 'lightbox-prev',
                nextButtonClass: 'lightbox-next',
                captionClass: 'lightbox-caption'
            };

        // plugin init
        var Plugin = function (elements, options) {
            if ( elements.length === 0 ) return;

            console.log('Lightbox init');

            // use for closure
            var plugin = this;

            this.currentIndex = 0;
            this.visible = false;
            // cache loading image, use instance to store because we want only 1 cache at same time
            this.cache = new Image();
            this.elements = elements;
            this.options = $.extend( {}, defaults, options );

            // hide nav if only 1 image
            this.options.nav = this.options.nav && this.elements.length > 1;

            // create lightbox element
            this.lightbox = $('<div>')
                .addClass(this.options.className)
                .hide();

            this.caption = $('<div>', {
                'class': this.options.captionClass
            });

            this.wrapper = $('<div>', {
                'class': this.options.wrapperClass
            });

            this.loading = $('<div>', {
                'class': this.options.loadingClass
            });

            // use spin.js to create loading animate
            if (typeof Spinner === 'function') {
                new Spinner({
                    lines: 12,
                    width: 4,
                    radius: 16,
                    color: '#fff'
                }).spin( this.loading[0] );
            }

            this.img = $('<img>', {
                'class': this.options.imgClass
            });

            this.closeButton = $('<div>', {
                'class': this.options.closeButtonClass
            });

            this.prevButton = $('<div>', {
                'class': this.options.prevButtonClass
            }).toggle( this.options.nav );

            this.nextButton = $('<div>', {
                'class': this.options.nextButtonClass
            }).toggle( this.options.nav );

            this.lightbox
                .append(
                    this.wrapper
                        .append( this.loading )
                        .append( this.img )
                )
                .append( this.caption )
                .append( this.prevButton )
                .append( this.nextButton )
                .append( this.closeButton );

            $('body').append( this.lightbox );

            $( this.cache ).load(function (e) {
                // console.log('Loaded image', this.src);

                plugin.loading.stop().fadeOut('fast');
                plugin.img[0].src = this.src;
            });

            this.elements.each( function (index, element) {
                $(element).on('click', index, function (e) {
                    e.preventDefault();

                    plugin.show();
                    plugin.currentIndex = e.data;
                    plugin.loadImage();
                });
            });

            // Bind Keyboard Shortcuts
            $( document ).on('keydown.lightbox', function (e) {
                if ( !plugin.visible ) {
                    return;
                }

                switch ( e.which ) {
                    // Esc
                    case 27:
                        plugin.close();
                        break;
                    // Left
                    case 37:
                        plugin.prev();
                        break;
                    // Right
                    case 39:
                        plugin.next();
                        break;
                }
            });

            // Add click state on overlay background only
            this.lightbox.add( this.wrapper ).on('click', function (e) {
                if ( this === e.target ) {
                    plugin.close();
                }
            });

            // Previous click
            this.prevButton.on('click', function () {
                plugin.prev();
            });

            // Next click
            this.nextButton.on('click', function () {
                plugin.next();
            });

            // Close click
            this.closeButton.on('click', function () {
                plugin.close();
            });
        };

        Plugin.prototype = {
            current: function () {
                return $( this.elements[ this.currentIndex ] );
            },

            // display lightbox
            show: function () {
                this.lightbox.fadeIn('fast');
                this.visible = true;
            },

            // load current image
            loadImage: function () {
                var plugin = this,
                    caption = this.current().data('caption'),
                    url = this.current().attr('href');

                // console.log('Loading image', url);

                this.loading.stop().fadeIn('fast');

                // if src does not change, will not trigger load event
                this.cache.src = '';
                this.cache.src = url;

                if ( caption ) {
                    this.caption
                        .text( caption )
                        .fadeIn('fast');
                } else {
                    this.caption.fadeOut('fast');
                }
            },

            next: function () {
                this.currentIndex++;

                if ( this.currentIndex >= this.elements.length ) {
                    this.currentIndex = 0;
                }

                this.loadImage( this.current().attr('href') );
            },

            prev: function () {
                this.currentIndex--;

                if ( this.currentIndex < 0 ) {
                    this.currentIndex = this.elements.length - 1;
                }

                this.loadImage( this.current().attr('href') );
            },

            close: function () {
                this.lightbox.fadeOut('fast');
                this.visible = false;
            }
        };

        if ( !this.data( dataKey ) ) {
            this.data( dataKey, new Plugin(this, options) );
        }

        return this;
    };

})(jQuery);
