module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            build: {
                src: 'jquery.lightbox.js',
                dest: 'jquery.lightbox.min.js'
            },
            options: {
                report: 'gzip',
                preserveComments: 'some'
            }
        },

        cssmin: {
            compress: {
                files: {
                    'jquery.lightbox.min.css': ['jquery.lightbox.css']
                }
            },
            options: {
                report: 'gzip'
            }
        },

        jshint: {
            all: ['jquery.lightbox.js']
        },

        copy: {
            build: {
                files: [{
                    src: 'jquery.lightbox.css',
                    dest: 'scss/jquery.lightbox.scss'
                }, 
                {
                    src: 'jquery.lightbox.css',
                    dest: 'less/jquery.lightbox.less'
                }]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'cssmin', 'jshint', 'copy']);

};