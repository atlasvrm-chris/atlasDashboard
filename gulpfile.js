import gulp from 'gulp'
import newer from 'gulp-newer'
import imagemin from 'gulp-imagemin'
// import sass from 'gulp-sass'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'

const sass = gulpSass(dartSass)

import sourcemaps from 'gulp-sourcemaps'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import rename from 'gulp-rename'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import fileinclude from 'gulp-file-include'
import rtlcss from 'gulp-rtlcss'
import lodash from 'lodash';
import plumber from 'gulp-plumber'
import minify from 'gulp-minify'


var app = "./hyper/";

var folder = {
    src: app + "static/source/", // source files
    dist: app + "static/", // build files
    dist_assets: app + "static/", //build assets files
};

// command line args
var arg = ((argList) => {
    let arg = {},
        a,
        opt,
        thisOpt,
        curOpt;
    for (a = 0; a < argList.length; a++) {
        thisOpt = argList[a].trim();
        opt = thisOpt.replace(/^\-+/, "");

        if (opt === thisOpt) {
            // argument value
            if (curOpt) arg[curOpt] = opt;
            curOpt = null;
        } else {
            // argument name
            curOpt = opt;
            arg[curOpt] = true;
        }
    }

    return arg;
})(process.argv);


function copyAssets(done) {

    const distDemoFolder = folder.dist_assets

    // optional assets - mainly used for demo purpose
    var optionalAssets = {
        js: [
            "./node_modules/chart.js/dist/chart.min.js",
            "./node_modules/d3/dist/d3.min.js",
            "./node_modules/daterangepicker/moment.min.js",
            "./node_modules/daterangepicker/daterangepicker.js",
            "./node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js",
            "./node_modules/admin-resources/jquery.vectormap/jquery-jvectormap-1.2.2.min.js",
            "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-world-mill-en.js",
            "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-us-merc-en.js",
            "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-au-mill-en.js",
            "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-us-il-chicago-mill-en.js",
            "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-in-mill-en.js",
            "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-uk-mill-en.js",
            "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-ca-lcc-en.js",
            "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-europe-mill-en.js",
            "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-fr-merc-en.js",
            "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-es-merc.js",
            "./node_modules/admin-resources/jquery.vectormap/maps/jquery-jvectormap-es-mill.js",
            "./node_modules/select2/dist/js/select2.min.js",
            "./node_modules/typeahead.js/dist/typeahead.bundle.min.js",
            "./node_modules/flatpickr/dist/flatpickr.min.js",
            "./node_modules/handlebars/dist/handlebars.min.js",
            "./node_modules/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js",
            "./node_modules/quill/dist/quill.min.js",
            "./node_modules/simplemde/dist/simplemde.min.js",
            "./node_modules/twitter-bootstrap-wizard/jquery.bootstrap.wizard.min.js",
            "./node_modules/dropzone/dist/min/dropzone.min.js",
            "./node_modules/datatables.net-bs5/js/dataTables.bootstrap5.min.js",
            "./node_modules/datatables.net-responsive-bs5/js/responsive.bootstrap5.min.js",
            "./node_modules/datatables.net-fixedcolumns-bs5/js/fixedColumns.bootstrap5.min.js",
            "./node_modules/datatables.net-buttons-bs5/js/buttons.bootstrap5.min.js",
            "./node_modules/datatables.net-responsive/js/dataTables.responsive.min.js",
            "./node_modules/datatables.net-buttons/js/dataTables.buttons.min.js",
            "./node_modules/datatables.net-buttons/js/buttons.html5.min.js",
            "./node_modules/datatables.net-buttons/js/buttons.flash.min.js",
            "./node_modules/datatables.net-buttons/js/buttons.print.min.js",
            "./node_modules/datatables.net/js/jquery.dataTables.min.js",
            "./node_modules/datatables.net-fixedheader/js/dataTables.fixedHeader.min.js",
            "./node_modules/gmaps/gmaps.min.js",
            "./node_modules/jquery-sparkline/jquery.sparkline.min.js",
            "./node_modules/dragula/dist/dragula.min.js",
            "./node_modules/ion-rangeslider/js/ion.rangeSlider.min.js",
            "./node_modules/jquery.rateit/scripts/jquery.rateit.min.js",
            "./node_modules/jstree/dist/jstree.min.js",
            "./node_modules/britecharts/dist/bundled/britecharts.min.js",
            "./node_modules/jquery-datatables-checkboxes/js/dataTables.checkboxes.min.js",
            "./node_modules/frappe-gantt/dist/frappe-gantt.min.js",
            "./node_modules/highlightjs/highlight.pack.min.js",
            "./node_modules/clipboard/dist/clipboard.min.js",
            "./node_modules/apexcharts/dist/apexcharts.min.js",
            "./node_modules/jquery-toast-plugin/dist/jquery.toast.min.js",
             "./node_modules/bootstrap-timepicker/js/bootstrap-timepicker.min.js",
            {"name": "fullcalendar.min.js", "file": "./node_modules/fullcalendar/main.min.js"}
        ],
        css: [
            "./node_modules/daterangepicker/daterangepicker.css",
            "./node_modules/admin-resources/jquery.vectormap/jquery-jvectormap-1.2.2.css",
            "./node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css",
            {"name": "fullcalendar.min.css", "file": "./node_modules/fullcalendar/main.min.css"},
            "./node_modules/select2/dist/css/select2.min.css",
            "./node_modules/flatpickr/dist/flatpickr.min.css",
            "./node_modules/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css",
            "./node_modules/quill/dist/quill.core.css",
            "./node_modules/quill/dist/quill.bubble.css",
            "./node_modules/quill/dist/quill.snow.css",
            "./node_modules/simplemde/dist/simplemde.min.css",
            "./node_modules/datatables.net-bs5/css/dataTables.bootstrap5.min.css",
            "./node_modules/datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css",
            "./node_modules/datatables.net-fixedcolumns-bs5/css/fixedColumns.bootstrap5.min.css",
            "./node_modules/datatables.net-fixedheader-bs5/css/fixedHeader.bootstrap5.min.css",
            "./node_modules/datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css",
            "./node_modules/datatables.net-select-bs5/css/select.bootstrap5.min.css",
            "./node_modules/daterangepicker/daterangepicker.css",
            "./node_modules/britecharts/dist/css/britecharts.min.css",
            "./node_modules/frappe-gantt/dist/frappe-gantt.min.css",
            "./node_modules/jquery-toast-plugin/dist/jquery.toast.min.css",
            "./node_modules/bootstrap-timepicker/css/bootstrap-timepicker.min.css",

            {"name": "jstree.min.css", "file": "./node_modules/jstree/dist/themes/default/style.min.css"},
            {"name": "32px.png", "file": "./node_modules/jstree/dist/themes/default/32px.png"},
            {"name": "throbber.gif", "file": "./node_modules/jstree/dist/themes/default/throbber.gif"},
        ],
        // data: [
        //      folder.src + "data/ajax_demo_children.json",
        // ]
    };

    //copying third party assets
    lodash(optionalAssets).forEach(function (assets, type) {
        var dest = distDemoFolder + type + "/vendor";
        var objAssets = assets.filter(a => typeof a === 'object' && a !== null);

        lodash(objAssets).forEach(function (a) {
            gulp.src(a.file).pipe(rename(a.name)).pipe(gulp.dest(dest));
        });

        var nonObjAssets = assets.filter(a => typeof a !== 'object' && a !== null);
        gulp.src(nonObjAssets).pipe(gulp.dest(dest));
    });

    done();
}


// image processing
function imageMin() {
    var out = folder.dist_assets + "images";
    return gulp
        .src(folder.src + "images/**/*")
        .pipe(newer(out))
        .pipe(imagemin())
        .pipe(gulp.dest(out));
}

// copy fonts from src folder to dist folder
function fonts() {
    var out = folder.dist_assets + "fonts/";

    return gulp.src([folder.src + "fonts/**/*"]).pipe(gulp.dest(out));
}

// copy dummy data in assets
function data() {
    var out = folder.dist_assets + "data/";

    return gulp.src([folder.src + "data/**/*"]).pipe(gulp.dest(out));
}

// compile & minify sass
function css() {
    gulp
        .src([folder.src + "/scss/**/*.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass()) // scss to css
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["> 1%"],
            })
        )
        .pipe(gulp.dest(folder.dist_assets + "css/"))
        .pipe(cleanCSS())
        .pipe(
            rename({
                // rename app.css to icons.min.css
                suffix: ".min",
            })
        )
        .pipe(sourcemaps.write("./")) // source maps for icons.min.css
        .pipe(gulp.dest(folder.dist_assets + "css/"));

    return gulp
        .src([folder.src + "/scss/**/*.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass()) // scss to css
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["> 1%"],
            })
        )
        .pipe(gulp.dest(folder.dist_assets + "css/"))
        .pipe(rtlcss())
        .pipe(
            rename({
                // rename app.css to icons.min.css
                suffix: "-rtl.min",
            })
        )
        .pipe(sourcemaps.write("./")) // source maps for icons.min.css
        .pipe(gulp.dest(folder.dist_assets + "css/"));
}

// js
function jsPages() {
    var out = folder.dist_assets + "js/";

    return gulp
        .src(folder.src + "js/pages/*.js")
        .pipe(uglify())
        .on("error", function (err) {
            console.log(err.toString());
        })
        .pipe(gulp.dest(out + "pages"));
}

// js ui
function jsUi() {
    var out = folder.dist_assets + "js/";

    return gulp
        .src(folder.src + "js/ui/*.js")
        .pipe(uglify())
        .on("error", function (err) {
            console.log(err.toString());
        })
        .pipe(gulp.dest(out + "ui"));
}

function jsVendor() {
    var out = folder.dist_assets + "js/";

    // It's important to keep files at this order
    // so that `app.min.js` can be executed properly
    return gulp
        .src([
            "./node_modules/jquery/dist/jquery.js",
            "./node_modules/bootstrap/dist/js/bootstrap.bundle.js",
            "./node_modules/moment/moment.js",
            "./node_modules/simplebar/dist/simplebar.min.js",
            "./node_modules/daterangepicker/daterangepicker.js",
            "./node_modules/jquery-toast-plugin/dist/jquery.toast.min.js",
            "./node_modules/select2/dist/js/select2.min.js",
            "./node_modules/jquery-mask-plugin/dist/jquery.mask.min.js",
            "./node_modules/twitter-bootstrap-wizard/jquery.bootstrap.wizard.min.js",
            "./node_modules/bootstrap-timepicker/js/bootstrap-timepicker.min.js",
            "./node_modules/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js",
            "./node_modules/bootstrap-maxlength/dist/bootstrap-maxlength.min.js",
            "./node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js",
        ])
        .pipe(sourcemaps.init())
        .pipe(concat("vendor.js"))
        .pipe(gulp.dest(out))
        .pipe(
            rename({
                // rename app.js to app.min.js
                suffix: ".min",
            })
        )
        .pipe(minify())
        .on("error", function (err) {
            console.log(err.toString());
        })
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(out));
}

// Javascript minification
function scripts() {

    gulp
        .src(folder.src + "js/hyper-syntax.js")
        .pipe(concat("hyper-syntax.js"))
        .pipe(gulp.dest(folder.dist_assets + "js"))
        .pipe(plumber()) // Checks for errors
        .pipe(uglify()) // Minifies the js
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(folder.dist_assets + "js"));


    var allJs = lodash.union([folder.src + "js/hyper-config.js"], [folder.src + "js/hyper-layout.js"], [folder.src + "js/hyper-main.js"]);

    return gulp
        .src(allJs)
        .pipe(concat("app.js"))
        .pipe(gulp.dest(folder.dist_assets + "js"))
        .pipe(plumber()) // Checks for errors
        .pipe(uglify()) // Minifies the js
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(folder.dist_assets + "js"));
}


// watch all changes
function watchFiles() {
    gulp.watch(
        folder.src + "images/**/*",
        gulp.series(imageMin)
    );
    gulp.watch(
        folder.src + "fonts/**/*",
        gulp.series(fonts)
    );
    gulp.watch(folder.src + "scss/**/*", gulp.series(css));
    gulp.watch(
        folder.src + "js/**/*",
        gulp.series(jsVendor, jsPages, scripts)
    );
}

// watch all changes
gulp.task("watch", gulp.parallel(watchFiles));

// default task
gulp.task(
    "default",
    gulp.series(
        // copyAssetsJs,
        // copyAssetsCss,
        copyAssets,

        imageMin,
        fonts,
        data,
        css,
        jsVendor,
        jsPages,
        jsUi,
        scripts,
        "watch"
    ),
    function (done) {
        done();
    }
);

// build
gulp.task(
    "build",
    gulp.series(
        // copyAssetsJs,
        // copyAssetsCss,
        copyAssets,

        imageMin,
        fonts,
        data,
        css,
        jsVendor,
        jsPages,
        jsUi,
        scripts
    )
);
