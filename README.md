Lane Community College MegaMenu
===============================
The Lane MegaMenu is an attempt to assist in providing unified branding and navigation across all of the various web properties at the college. It can be viewed at top of our [homepage](https://www.lanecc.edu).

To use the MegaMenu on your site, simply add it to your HTML:

    <script src='//static.lanecc.net/mm/lmm.min.js'></script>

This megamenu does not support IE9 or below.

Development
-----------
To start development, you'll first need to have npm, sass, and jade installed. After cloning this repository run `npm install` to install needed dependencies for the build process. When you're ready to build, run `gulp build`. This will generate the generate both css and js files in /dist/ for development, as well as a minified version for production.

By default, links have Google Analytics style tracking parameters added to them. To skip this, include the class `skip` on a link.
