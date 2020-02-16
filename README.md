# express-server

Simple nodeJS Express.js server for use with the portfolio-website repo (and a reverse proxy to handle HTTPS)

Includes support for:
* Serving of static assets from /../portfolio-website/www/
* express-rate-limit npm package - basic rate limiting for express
* helmet npm package - to set HTTP headers appropriately for improved security
