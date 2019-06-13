const mix = require('laravel-mix');

mix.setPublicPath('./web')
    .js('src/javascript/app.js', 'web/dist')
    .extract([
        'jquery', 'bootstrap-sass', 'slick-carousel', 'jquery-match-height',
        'magnific-popup', 'js-cookie'
    ])
    .sass('src/style/app.scss', 'web/dist')
    .sass('src/style/fontawesome.scss', 'web/dist')
    .autoload({
        jquery: ['$', 'window.jQuery', "jQuery", "window.$", "jquery", "window.jquery"]
    })
    .browserSync({
        proxy: 'sandbox.test',
        files: [
           './templates/**/*.twig',
           './web/dist/*'
        ],
    })
    .sourceMaps(!mix.inProduction());

if (mix.inProduction()) {
    mix.version();
}
