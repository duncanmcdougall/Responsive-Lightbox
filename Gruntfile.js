module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      build: {
        src: 'jquery.lightbox.js',
        dest: 'jquery.lightbox.min.js'
      },
      options: {
        report : 'gzip',
        preserveComments : 'some'
      }
    },

    cssmin: {
      compress: {
        files: {
          'jquery.lightbox.min.css': ['jquery.lightbox.css']
        }
      },
      options: {
        report : 'gzip'
      }
    },

    jshint: {
      all: ['jquery.lightbox.js']
    }
  });

  // Load the plugin that provides the "uglify" task.

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'cssmin', 'jshint']);

};