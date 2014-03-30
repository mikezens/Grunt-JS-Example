module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: ['src/assets/js/*.js'],
        dest: 'build/assets/js/global.min.js'
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed' 
        },
        files: [{
          expand: true,
          cwd: 'src/assets/sass',
          src: ['*.scss'],
          dest: 'build/assets/css',
          ext: '.css'
        }]
      }
    },
    htmlmin: {                                     
      dist: {                                      
        options: {                                 
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'build/index.html': 'src/index.html'
        }
      }
    },
    imagemin: {                        
      static: {                          
        options: {                       
          optimizationLevel: 3
        }
      },
      dynamic: {                         
        files: [{
          expand: true,                  
          cwd: 'src/assets/img',                   
          src: ['**/*.{png,jpg,gif}'],   
          dest: 'build/assets/img'                  
        }]
      },
    },
    watch: {
      scripts: {
        files: ['src/assets/js/**/*.js'],
        tasks: ['uglify']
      },
      sass: {
        files: ['src/assets/sass/**/*.scss'],
        tasks: ['sass'],
      },
      htmlmin: {
        files: ['src/index.html'],
        tasks: ['htmlmin'],
      },
      imagemin: {
        files: ['src/assets/img/**/*'],
        tasks: ['imagemin'],
      }
    }
  });
  
  
  // Watch Event  
  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });
  
  
  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // Default task(s).
  grunt.registerTask('default', ['uglify', 'sass', 'htmlmin', 'imagemin', 'watch']);

};