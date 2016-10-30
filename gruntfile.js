module.exports = function(grunt) {
  grunt.initConfig({

    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: 'src/sass/**/*.scss',
        tasks: ['sass'],
      },
      pug: {
        files: 'src/*.pug',
        tasks: ['pug'],
      },
      configFiles: {
        files: [ 'Gruntfile.js', 'config/*.js' ],
        options: {
          reload: true
        }
      },
    },

    sass: {
      dist: {
        options: {
          style: 'expanded',
        },
        files: {
          'dist/style.css': 'src/sass/main.scss'
        }
      }
    },

    pug: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: {
          'dist/index.html': ['src/index.pug', 'src/components/*.pug']
        }
      }
    },

    connect: {
      server: {
        options: {
          livereload: true,
          port: 8000,
          base: 'dist'
        }
      }
    },

    compress: {
      main: {
        options: {
          mode: 'gzip',
          pretty: true,
        },
        expand: true,
        src: ['dist/*.html', 'dist/*.css', 'dist/*.js'],
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compress');

  grunt.registerTask('default', ['connect:server','watch']);
  grunt.registerTask('build-prod', ['sass','pug','compress']);
};