var Encore = require('@symfony/webpack-encore');

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if you JavaScript imports CSS.
     */
    .addEntry('app', './assets/js/app.js')
    .addEntry('login', './assets/js/login.js')
    .addEntry('base', './assets/js/base.js')
    .addEntry('resetpassword', './assets/js/resetpassword.js')
    .addEntry('userIndex', './assets/js/userIndex.js')
    .addEntry('userEdit', './assets/js/userEdit.js')
    .addEntry('layout', './assets/js/layout.js')
    .addEntry('userRegistration', './assets/js/userRegistration.js')
    .addEntry('entrepriseIndex', './assets/js/entrepriseIndex.js')
    .addEntry('entrepriseShow', './assets/js/entrepriseShow.js')
    .addEntry('entrepriseNew', './assets/js/entrepriseNew.js')
    .addEntry('entrepriseEdit', './assets/js/entrepriseEdit.js')
    .addEntry('contactAdd', './assets/js/contactAdd.js')
    .addEntry('addActivite', './assets/js/addActivite.js')
    .addEntry('addPoste', './assets/js/addPoste.js')
    .addEntry('batimentIndex', './assets/js/batimentIndex.js')
    .addEntry('batimentAddEdit', './assets/js/batimentAddEdit.js')
    .addEntry('reference', './assets/js/reference.js')
    // When enabled, Webpack "splits" your files into sm
    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // enables Sass/SCSS support
    //.enableSassLoader()

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment if you're having problems with a jQuery plugin
    //.autoProvidejQuery()

    // uncomment if you use API Platform Admin (composer req api-admin)
    //.enableReactPreset()
    //.addEntry('admin', './assets/js/admin.js')
;

module.exports = Encore.getWebpackConfig();
