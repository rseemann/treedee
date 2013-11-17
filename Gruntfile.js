module.exports = function(grunt) {
  grunt.initConfig({
    exec: {
      server: {
        command : "python3 -m http.server"
      }
    }

  });

  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('dev', ['exec:server']);
}