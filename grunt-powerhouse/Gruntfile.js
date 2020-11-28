/*
 After you have changed any settings for the responsive_images task,
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

  grunt.initConfig({
     critical: {
    dist: {
      options: {
        base: './'
      },
      // The source file
      src: 'page.html',
      // The destination file
      dest: 'result.html'
      }
    },
	resize_crop: {
      image_group: {
        options: {
          format: "jpg",
          gravity: "center",
          height: 200,
          width: 200
        },
        files: {
          'images/': [
            'images_src/prateek.jpg'
          ],
        },
      },
    },

    responsive_images: {
      dev: {
        options: {
          engine: 'gm',
          sizes: [{
            width: 70,
            suffix: '_small_1x',
            quality: 30
          }]
        },
        files: [{
          expand: true,
          src: ['prateek.xcf'],
          cwd: 'images_src/',
          dest: 'images/'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['images'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['images']
        },
      },
    },

    /* Copy the "fixed" images that don't go through processing into the images/directory */
    copy: {
      dev: {
        files: [{
          expand: true,
          src: ['images_src/fixed/*.{gif,jpg,png,gimp}'],
          dest: 'images/',
          flatten: true,
        }]
      },
    },

  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-resize-crop');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-critical');
  // grunt.registerTask('default', ['mkdir', 'copy','grunt-resize-crop']);
  // grunt.registerTask('default', ['mkdir', 'copy', 'responsive_images']);
  grunt.registerTask('default', ['critical']);
};
