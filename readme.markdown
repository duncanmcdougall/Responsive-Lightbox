Responsive-Lightbox
===================
by [Duncan McDougall](http://www.duncanmcdougall.co.uk) | [@duncanmcdougall](http://www.twitter.com/duncanmcdougall)

jQuery responsive lightbox plugin.

Shrinks the image to the width & height of the browser. Only handles images so it's nice and lightweight. 

Demonstration
-------------
[Responsive Lightbox Demo](http://www.duncanmcdougall.co.uk/projects/responsive-lightbox.html)

Dependencies
-------------
jQuery >= 1.4

Browser Support
-------------
IE7+


Usage
------

```html
<html>
<head>
<link rel="stylesheet" href="lightbox.css" />
</head>
<body>
<!-- Link to the image -->
<div class="gallery">
<a href="photo1.jpg">Image 1</a>
<a href="photo2.jpg">Image 2</a>
</div>

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src="lightbox.min.js"></script>

<script>
 $(function()
 {
    $('.gallery a').lightbox(); 
	
	// If you want seperate galleries on the same page
	// just specify different class names. 
	$('.gallery-2 a').lightbox();
 });
</script>
</body>

```

Options
------

```bash
    $('.gallery').lightbox({ margin: 20, nav: false, blur: true, minSize: 480 });
```

* margin - int - default 50. Minimum margin around the image
* nav - bool - default true. enable navigation
* blur - bool - default true. Blur other content when open using css filter
* minSize - int - default 0. Min window width or height to open lightbox. Below threshold will open image in a new tab.

Captions
------

Add your captions as a data attribute to the anchor. e.g.

```html
    <a href="myimage.jpg" data-caption="This is a picture of a cat" >
```

Contributing
------

First, clone a copy of using the GUI or the main git repo by running:

```bash
git clone git://github.com/duncanmcdougall/Responsive-Lightbox.git
```

I'm using GruntJS to do all the minification and linting as build tasks.

Install the grunt-cli package so that you will have the correct version of grunt available from any project that needs it. This should be done as a global install:

```bash
npm install -g grunt-cli
```

Enter the jquery directory and install the Node dependencies, this time *without* specifying a global install:

```bash
cd Responsive-Lightbox && npm install
```

Make sure you have `grunt` installed by testing:

```bash
grunt -version
```

Then, to get a complete, minified (w/ Uglify.js), linted (w/ JSHint) version of the plugin, type the following:

```bash
grunt
```

The built version of the plugin will be saved to .min versions.

Next Steps
------
* Options: { loop }
* Faster image switching
* Light and dark simple themes

Thanks To
--------
I'd like to thank [Matthew Hartman](http://www.matthewhartman.com.au/), [imiric](https://github.com/imiric) et all for contributing a number of improvements to the lightbox.

MIT License
--------
This plugin is released under the [MIT License](http://duncanmcdougall.mit-license.org/). Enjoy.
