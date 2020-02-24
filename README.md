Bluestorm Technical Test
========================

The test based on Craft CMS with various plugins loaded and pre-configured. The base elements and matrix blocks have
already been added.

Full documentation of Craft can be found here: https://docs.craftcms.com/v3/

Requirements
------------

- PHP 7.2+ (with at least 265MB of RAM)
- Web server (Apache / Nginx / others)
- MySQL or MariaDB 5.7+
- Node v9, the packages were installed using node v9.11.2
- Composer

Internally we use Laravel Valet to serve these pages. Use whichever web server you are most comfortable with.

Installation
------------

- Create a new database and import the file `dbdump.sql.gz`
- Create your .env file by copying the .env.example and apply the correct values
- Run `composer install`
- Run `npm install` to get the required frontend dependencies
- Run `npm run dev` to generate the JS and CSS that will be used to style the site
- Create a `storage` folder in the root directory and give users write access to this folder

Once these steps have been completed you will be able to see the site working in your browser.

CMS Login Details
-----------------

Admin User: admin / password

