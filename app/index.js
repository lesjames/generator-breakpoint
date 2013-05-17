'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var BreakpointGenerator = module.exports = function BreakpointGenerator(args, options, config) {

    yeoman.generators.Base.apply(this, arguments);

    console.log('Django: ' + this.django);
    console.log('Wordpress: ' + this.wordpress);

/*
    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });
*/

};

util.inherits(BreakpointGenerator, yeoman.generators.NamedBase);

BreakpointGenerator.prototype.askDjango = function askDjango() {

    var cb = this.async();

    // welcome message
    var welcome =
    '\n     _-----_' +
    '\n    |       |' +
    '\n    |'+'--(o)--'.red+'|   .--------------------------.' +
    '\n   `---------´  |    '+'Welcome to Yeoman,'.yellow.bold+'    |' +
    '\n    '+'( '.yellow+'_'+'´U`'.yellow+'_'+' )'.yellow+'   |   '+'ladies and gentlemen!'.yellow.bold+'  |' +
    '\n    /___A___\\   \'__________________________\'' +
    '\n     |  ~  |'.yellow +
    '\n   __'+'\'.___.\''.yellow+'__' +
    '\n ´   '+'`  |'.red+'° '+'´ Y'.red+' `\n';

    var note =
    'Let\'s install Breakpoint!\n\n' +
    'This generator has an opinionated setup for Django or Wordpress.' +
    'If you don\'t want the opinionated setup answer no to the setup questions' +
    'and everything will be dumped into your current directory.\n';

    console.log(welcome);
    console.log(note);

    var prompts = [{
        name: 'django',
        message: 'Is this a Django project?',
        default: 'y/N'
    }];

    this.prompt(prompts, function (err, props) {

        if (err) {
          return this.emit('error', err);
        }

        this.django = /y/i.test(props.django);

        cb();

    }.bind(this));

};

BreakpointGenerator.prototype.askWordpress = function askWordpress() {

    var cb = this.async();

    var prompts = [{
        name: 'wordpress',
        message: 'Is this a Wordpress project?',
        default: 'y/N'
    }];

    if (!this.django) {
        this.prompt(prompts, function (err, props) {

            if (err) {
              return this.emit('error', err);
            }

            this.wordpress = /y/i.test(props.wordpress);

            cb();

        }.bind(this));
    } else {
        cb();
    }
};

BreakpointGenerator.prototype.theme = function theme() {

    var cb = this.async();

    var prompts = [{
        name: 'themeName',
        message: 'What should the theme folder be called?',
        default: 'site'
    }];

    if (this.wordpress) {
        this.prompt(prompts, function (err, props) {

            if (err) {
              return this.emit('error', err);
            }

            this.themeName = props.themeName;

            cb();

        }.bind(this));
    } else {
        cb();
    }
};

BreakpointGenerator.prototype.install = function install() {

    this.copy('bower.json', 'bower.json');
    this.copy('package.json', 'package.json');

    if (this.django) {

        this.directory('dev', 'website/dev');
        this.copy('index.html', 'website/templates/base.html');
        this.writeFileFromString('{\n    "directory": "website/dev/components"\n}\n', '.bowerrc');
        this.siteroot = 'website/';
        this.template('Gruntfile.js');

    } else if (this.wordpress) {

        this.directory('dev', 'website/wp-content/themes/'+ this.themeName +'/dev');
        this.copy('index.html', 'website/wp-content/themes/'+ this.themeName +'/index.php');
        this.writeFileFromString('{\n    "directory": "website/wp-content/themes/'+ this.themeName +'/dev/components"\n}\n', '.bowerrc');

    } else {

        this.directory('dev');
        this.copy('index.html', 'index.html');
        this.copy('.bowerrc', '.bowerrc');

    }

};