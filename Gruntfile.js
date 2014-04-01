module.exports = function(grunt) {
   grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 8080,
          keepalive: true,
          base: '.'
        }
      }
    }
   });

  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['connect']);
};