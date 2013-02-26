Responsive-Lightbox
===================
by [Duncan McDougall](http://www.diaryofanappdeveloper.com) | [@duncanmcdougall](http://www.twitter.com/duncanmcdougall)

jQuery responsive lightbox plugin.

Shrinks the image to the width & height of the browser. Only handles images so it's nice and lightweight. 


Demonstration
-------------
[http://www.duncanmcdougall.co.uk/projects/responsive-lightbox.html](http://www.duncanmcdougall.co.uk/projects/responsive-lightbox.html)


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
<a href="myimage.jpg" rel="lightbox">Click me</a>

<script src="jquery.js"></script>
<script src="lightbox.min.js"></script>

<script>
 $(function()
 {
    $('[rel="lightbox"]').lightbox();
 });
</script>
</body>

```

Thanks To
--------
I'd like to thank [Matthew Hartman](http://www.matthewhartman.com.au/) for contributing a number of improvements to the lightbox.

License
--------

Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/

Free for use in both personal and commercial projects.
Attribution requires leaving author name, author homepage link, and the license info intact.