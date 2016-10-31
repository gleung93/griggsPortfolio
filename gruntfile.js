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
        files: 'src/**/*.pug',
        tasks: ['pug'],
      },
      images: {
        files: 'src/images/*',
        tasks: ['sync'],
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
          outputStyle: 'compressed',
          sourceMap: true
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

    sync: {
      main: {
        files: [{
          cwd: 'src/images',
          src: '**',
          dest: 'dist/images',
        }],
        verbose: true,
        updateAndDelete: true,
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
    },

    clean: ['dist']

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['connect:server','watch']);
  grunt.registerTask('build-dev', ['sass','pug','sync']);
  grunt.registerTask('build-prod', ['sass','pug','compress',]);
};
