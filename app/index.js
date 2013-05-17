'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var BreakpointGenerator = module.exports = function BreakpointGenerator(args, options, config) {

    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

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

    var note = 'Let\'s install Breakpoint!\n';

    console.log(welcome);
    console.log(note);

    var prompts = [
        {
            name: 'projectType',
            message: 'What type of project is this? (pick a number)\n1. No assumptions\n2. Django\n3. Wordpress\n--> '
        },
        {
            name: 'websiteRoot',
            message: 'What folder is your website root?',
            default: 'website'
        }
    ];

    this.prompt(prompts, function (err, props) {

        if (err) {
          return this.emit('error', err);
        }

        this.projectType = props.projectType;
        this.websiteRoot = props.websiteRoot;

        cb();

    }.bind(this));

};

BreakpointGenerator.prototype.theme = function theme() {

    var cb = this.async();
    this.wpVersion = '3.5.1';

    var prompts = [{
        name: 'themeName',
        message: 'What should the Wordpress theme folder be called?',
        default: 'site'
    }];

    if (this.projectType === '3') {
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

BreakpointGenerator.prototype.getWP = function getWP() {
    var cb = this.async();

    if (this.projectType === '3') {

        this.log.writeln('Downloading Wordpress version ' + this.wpVersion);
        this.tarball('https://github.com/WordPress/WordPress/tarball/'+ this.wpVersion, this.websiteRoot, cb);
        this.websiteRoot = this.websiteRoot + '/wp-content/themes/' + this.themeName

    } else {
        cb();
    }
};

BreakpointGenerator.prototype.install = function install() {

    this.copy('bower.json', 'bower.json');
    this.copy('package.json', 'package.json');
    this.template('Gruntfile.js');
    this.template('_bowerrc', '.bowerrc');
    this.directory('dev', this.websiteRoot + '/dev');

    if (this.projectType === '2') {

        // django
        this.copy('index.html', this.websiteRoot + '/templates/base.html');

    } else if (this.projectType === '3') {

        // wordpress
        this.copy('index.html', this.websiteRoot + '/index.php');

    } else {

        // everything else
        this.template('index.html', this.websiteRoot + '/index.html');

    }

};