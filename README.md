# Yeoman Breakpoint Generator

The Yeoman Breakpoint generator is an opinionated starting point for responsive [Breakpoint](https://github.com/lesjames/breakpoint) projects. It uses [Node](http://nodejs.org/), [Yeoman](http://yeoman.io/), [Grunt](http://gruntjs.com/) and [Bower](http://bower.io/) to scaffold a project, manage dependencies and ready static files for production. It uses [RequireJS](http://requirejs.org/) to structure your Javascript into modules. It uses [Bourbon](http://bourbon.io/) for CSS3 mixins and [Modernizr](http://modernizr.com/) for progressive enhancement. The generator has project defaults for [Wordpress](http://wordpress.org/) or you can have it assume a vanilla setup.

To learn how to use the Breakpoint grid system please refer to the [Breakpoint](https://github.com/lesjames/breakpoint) project's repo.

## Preping Your Computer

Breakpoint's scaffolding requires Sass 3.2, Node, Yeoman, Grunt, Bower and this generator to be installed on your system.

Install Sass: `$ gem install sass`

Install Node: [http://nodejs.org/](http://nodejs.org/) or [from the command line](https://gist.github.com/isaacs/579814).

Install Grunt, Yeoman, Bower and the Breakpoint generator...

`$ npm install -g grunt-cli bower yo generator-breakpoint`

## Running the Generator

From the root of your project folder run...

`$ yo breakpoint`

The generator will install the Grunt and Bower configs wherever you run that command. Your HTML, CSS and JS installation can vary depending on the type of backend you are using. The generator defaults the website root to the current directory. If you want your website root to be placed in a subdirectory you can specify it when propted.

## Working with Grunt

When in development your front end assets will be placed in a 'dev' folder. During development Grunt will compile your Sass and lint your JS. You can have grunt watch your dev folder for changes...

`$ grunt watch`

You can also manually trigger a Sass compile by typing `$ grunt`.

When pushing to production, Grunt will compile, concat and minify your front end assets and place them in a new folder called 'static'. Your HTML needs to point to this folder in the production environment. To create a build type...

`$ grunt build`

The easiest way to have your HTML templates switch between development and production versions of your front end assets is to include some logic in your templates. An example of what this looks like is...

```php
<?php if (WP_DEBUG) : ?>
    <script data-main="/wp-content/themes/mytheme/dev/js/main" src="/wp-content/themes/mytheme/dev/bower_components/requirejs/require.js"></script>
<?php else : ?>
    <script data-main="/wp-content/themes/mytheme/static/js/main" src="/wp-content/themes/mytheme/static/js/vendor/require.js"></script>
<?php endif; ?>
```
