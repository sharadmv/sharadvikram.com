var stringify = require('stringify');
module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'sv/jsx/**/*.js*', 'sv/jsx/**/*.css', 'sv/jsx/**/*.md'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    browserify:     {
      options:      {
        transform:
          [["cssify", {}],
          [function(file) {
            return stringify({extensions: ['.md']}).call(stringify, file);
          }],
          [require('grunt-react').browserify, {}],
          ]
    },
    app:          {
      src:        'sv/jsx/App.jsx',
      dest:       'sv/static/build/main.js'
    }
  },
  watch: {
    files: ['<%= jshint.files %>'],
    tasks: ['browserify']
  }
});

grunt.loadNpmTasks('grunt-jsxhint');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-browserify');

grunt.registerTask('default', ['browserify']);

};
