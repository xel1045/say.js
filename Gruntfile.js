'use strict';

module.exports = function(grunt) {
	// Load plugins
	require('load-grunt-tasks')(grunt);

	// Load tasks
	grunt.loadTasks('./lib/grunt');

	// Config
	grunt.initConfig({
		mochaTest: {
			test: {
				options: {
					reporter: 'spec'
				},
				src: ['test/**/*.js']
			}
		},

		jshint: {
			options: {
				reporter: require('jshint-stylish')
			},
			all: {
				src: [
					'src/**/*.js'
				]
			}
		},

		uglify: {
			options: {
				banner: '/* Say.js - Copyright (c) 2014 eXolnet Inc. */\n'
			},
			build: {
				src: 'src/say.js',
				dest: 'build/say.min.js'
			}
		},

		watch: {
			js: {
				tasks: ['test', 'uglify'],
				files: [
					'src/**/*.js'
				]
			},
		},
	});

	// Alias tasks
	grunt.registerTask('test', ['jshint:all', 'test:unit']);
	grunt.registerTask('test:unit', ['mochaTest']);
	grunt.registerTask('default', ['watch']);
};
