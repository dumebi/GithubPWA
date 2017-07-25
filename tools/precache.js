const name = 'scotchPWA-v6'
module.exports = {
    staticFileGlobs: [
        './index.html',
        './images/*.{png,svg,gif,jpg}',
        './fonts/**/*.{woff,woff2}',
        './js/*.js',
        './css/*.css',
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'https://code.jquery.com/jquery-2.2.4.min.js'
    ],
    stripPrefix: './',
    runtimeCaching: [{
        urlPattern: /https:\/\/api\.github\.com\/search\/repositories/,
        handler: 'networkFirst',
        options: {
            cache: {
                name: name
            }
        }
    }]
};