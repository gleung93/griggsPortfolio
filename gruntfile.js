module.exports = function(grunt) {
  grunt.initConfig({

    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: 'src/sass/**/*.scss',
        tasks: ['sass', 'autoprefixer'],
      },
      template: {
        files: ['src/**/*.hbs','src/data/*.{json,yml}'],
        tasks: ['assemble'],
      },
      images: {
        files: 'src/images/*',
        tasks: ['sync'],
      },
      documents: {
        files: 'src/documents/*',
        tasks: ['sync'],
      },
      configFiles: {
        files: [ 'Gruntfile.js', 'config/*.js' ],
        options: {
          reload: true
        }
      },
    },

    assemble: {
      options: {
        data: "src/data/*.{json,yml}",
      },
      project: {
        options: {
          layout: "src/main-layout.hbs",
          partials: "src/components/**/*.hbs"
        },
        files: [{
          expand: true,
          cwd: 'src/pages',
          src: ['*.hbs'],
          dest: 'dist/'
        }]
      }
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

    autoprefixer:{
      dist:{
        files:{
          'dist/style.css':'dist/style.css'
        }
      }
    },

    sync: {
      main: {
        files: [{
          cwd: 'src/images',
          src: '**',
          dest: 'dist/images',
        },
        {
          cwd: 'src/documents',
          src: '**',
          dest: 'dist/documents',
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
          pretty: true
        },
        expand: true,
        src: ['dist/*.html', 'dist/*.css', 'dist/*.js']
      }
    },

    clean: ['dist']

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask('default', ['clean', 'build-dev','connect:server','watch']);
  grunt.registerTask('build-dev', ['sass', 'autoprefixer', 'assemble', 'sync',]);
  grunt.registerTask('build-prod', ['clean', 'sync', 'sass', 'assemble', 'autoprefixer', 'compress']);
  grunt.registerTask('server', ['connect:server']);

};
