/*
 * Alist-view-on-scroll
 * http://github.amexpub.com/modules/Alist-view-on-scroll
 *
 * Copyright (c) 2013 Amex Pub. All rights reserved.
 */

'use strict';
var exec = require('child_process').exec;

module.exports = function(grunt) {
  grunt.initConfig({
    jsbeautifier: {
      files: ["<%= jshint.all %>"],
      options: {
        "indent_size": 2,
        "indent_char": " ",
        "indent_level": 0,
        "indent_with_tabs": false,
        "preserve_newlines": true,
        "max_preserve_newlines": 10,
        "brace_style": "collapse",
        "keep_array_indentation": false,
        "keep_function_indentation": false,
        "space_before_conditional": true,
        "eval_code": false,
        "indent_case": false,
        "unescape_strings": false,
        "space_after_anon_function": true
      }
    },
    simplemocha: {
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'tap'
      },
      all: {
        src: 'test/**/*.js'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'config/**/*.js',
        'index.js',
        'lib/**/*.js',
        'routes/**/*.js',
        'test/**/*.js'
      ]
    },
    copy: {
      main: {
        files: [
          // includes files within path
          // {expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'},

          // includes files within path and its sub-directories
          // {expand: true, src: ['assets/**'], dest: '../module/assets/'},
          {expand: true,cwd: 'dist', src: ['**'], dest: '../../public/node_assets/npmd-ui-list-view-on-scroll/'},
          {expand: true,cwd: 'lib', src: ['list-view-on-scroll.js'], dest: '../../public/node_assets/npmd-ui-list-view-on-scroll/'},

          // makes all src relative to cwd
          // {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

          // flattens results to a single level
          // {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'}
        ]
      }
    },
    clean: ['../../public/node_assets/npmd-ui-list-view-on-scroll/'],
    watch: {
      scripts: {
        // files: '**/*.js',
        files: [
          'Gruntfile.js',
          'lib/**/*.js',
          'test/**/*.js',
          'example/src/*.js',
          'example/css/*.less'
        ],
        tasks: ['lint', 'less'],
        // tasks: ['lint', 'test','less'],
        options: {
          interrupt: true
        }
      }
      // files: "./assets/stylesheets/less/*",
      // tasks: ["less"]
    },
    less: {
      development: {
        options: {
          paths: ["example/assets/css"],
          yuicompress: true
        },
        files: {
          "example/assets/css/app.css": "./public/assets/css/app.less"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'simplemocha']);
  grunt.registerTask('lint', 'jshint');
  grunt.registerTask('test', 'simplemocha');

  grunt.event.on('watch', function(action, filepath, target) {
    exec("browserify "+__dirname+"/example/src/example1_main.js -o "+__dirname+"/example/example1.js");
    console.log("blah");
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });
};
