'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var BreakpointGenerator = module.exports = function BreakpointGenerator(args, options, config) {

    var that = this;

    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'], callback: function () {

            console.log('\nLet\'s run some Grunt tasks to get things ready');
            that.shell.exec('grunt init');

        } });


    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

};

util.inherits(BreakpointGenerator, yeoman.generators.Base);

BreakpointGenerator.prototype.askFor = function askFor() {

    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);
    console.log('Let\'s install Breakpoint!\n');

    var prompts = [{
        name: 'projectName',
        message: 'What\'s the name of this project?',
        default: 'newproject'
    },
    {
        type: 'confirm',
        name: 'projectType',
        message: 'Is this a Wordpress site?',
        default: false
    },
    {
        name: 'websiteRoot',
        message: 'Enter folder name for your website\'s files.\nLeave blank if you want the website root to be your present directory.',
        default: '.'
    }];

    this.prompt(prompts, function (props) {

        this.projectName = props.projectName;
        this.projectType = props.projectType;
        this.installWP = props.installWP;
        this.websiteRoot = props.websiteRoot;
        this.wpVersion = '3.6.1';

        cb();

    }.bind(this));

};

BreakpointGenerator.prototype.getWP = function getWP() {

    var cb = this.async();

    if (this.projectType) {

        this.log.writeln('Downloading Wordpress version ' + this.wpVersion);
        this.tarball('https://github.com/WordPress/WordPress/tarball/'+ this.wpVersion, this.websiteRoot, cb);
        this.websiteRoot = this.websiteRoot + '/wp-content/themes/' + this.projectName;

    } else {
        cb();
    }

};

BreakpointGenerator.prototype.app = function app() {

    this.template('_bower.json', 'bower.json');
    this.template('_package.json', 'package.json');
    this.template('_bowerrc', '.bowerrc');
    this.template('_Gruntfile.js', 'Gruntfile.js');
    this.directory('dev', this.websiteRoot + '/dev');

    if (this.projectType) {

        // wordpress
        this.template('_index.html', this.websiteRoot + '/index.php');

    } else {

        this.template('_index.html', this.websiteRoot + '/index.html');
        this.mkdir(this.websiteRoot + '/dev/css');
    }

};