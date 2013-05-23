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

Usage
------

```html
<html>
<head>
<link rel="stylesheet" href="lightbox.css" />
</head>
<body>
<!-- Link to the image -->
<a href="photo.jpg" rel="lightbox">Click me</a>

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src="lightbox.min.js"></script>

<script>
 $(function()
 {
    $('.lightbox').lightbox();
 });
</script>
</body>

```

Options
------

```bash
    $('.lightbox').lightbox({ margin: 20, nav: false, blur: true, minSize: 480,CloseButtonText: 'Close',PreviousButtonText: 'Previous', NextButtonText: 'Next'});
```

* margin - int - default 50. Minimum margin around the image
* nav - bool - default true. enable navigation
* blur - bool - default true. Blur other content when open using css filter
* minSize - int - default 0. Min window width or height to open lightbox. Below threshold will open image in a new tab.
* CloseButtonText - text - User can define Close Button Text
* PreviousButtonText - text - User can define Previous Button Text
* NextButtonText - text - User can define Next Button Text

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

License
--------

Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/

Free for use in both personal and commercial projects.
Attribution requires leaving author name, author homepage link, and the license info intact.

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/5d72f21aaa7123a5ee228de20ecc2e53 "githalytics.com")](http://githalytics.com/duncanmcdougall/Responsive-Lightbox)
