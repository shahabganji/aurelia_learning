define('app',["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App() {
        }
        App.prototype.configureRouter = function (config, router) {
            this.router = router;
            config.mapUnknownRoutes("not-found");
            config.title = "Contacts";
            config.map([
                { route: [''], moduleId: "public/home", name: 'home', nav: true, title: 'Home' },
                { route: ["about"], moduleId: "public/about", name: 'about', nav: true, title: 'About' },
                { route: "home", redirect: '' }
            ]);
        };
        return App;
    }());
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('startup',["require", "exports", './environment'], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('public/about',["require", "exports"], function (require, exports) {
    "use strict";
    var About = (function () {
        function About() {
            this.message = "Aurelia is a MV* framework for client side.";
        }
        return About;
    }());
    exports.About = About;
});

define('public/home',["require", "exports"], function (require, exports) {
    "use strict";
    var Home = (function () {
        function Home() {
            this.message = "Welcome to the aurelia tutorial";
        }
        return Home;
    }());
    exports.Home = Home;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n  <require from=\"alertify/css/alertify.css\"></require>\n  <require from=\"toastr/build/toastr.css\"></require>\n\n\n  <require from=\"./resources/elements/nav-bar.html\"></require>\n\n  <nav-bar inner-router.one-time=\"router\" inverse=\"true\" fixed-position=\"top\"></nav-bar>\n\n\n  <div class=\"container\">\n\n    <router-view>\n\n\n    </router-view>\n\n  </div>\n\n</template>"; });
define('text!public/about.html', ['module'], function(module) { module.exports = "<template>\r\n    ${message}\r\n</template>\r\n"; });
define('text!public/home.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n    ${message}\r\n\r\n</template>"; });
define('text!resources/elements/nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"innerRouter, inverse, fixedPosition\">\r\n\r\n    <nav class=\"navbar ${ inverse ? 'navbar-inverse' : 'navbar-default'} ${ fixedPosition === 'top'  ? 'navbar-static-top' : 'navbar-fixed-bottom'}\">\r\n        <div class=\"container-fluid\">\r\n            <!-- Brand and toggle get grouped for better mobile display -->\r\n            <div class=\"navbar-header\">\r\n                <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\"\r\n                    aria-expanded=\"false\">\r\n                        <span class=\"sr-only\">Toggle navigation</span>\r\n                        <span class=\"icon-bar\"></span>\r\n                        <span class=\"icon-bar\"></span>\r\n                        <span class=\"icon-bar\"></span>\r\n                </button>\r\n                <!--<a class=\"navbar-brand\" href=\"#\"></a>-->\r\n            </div>\r\n\r\n            <!-- Collect the nav links, forms, and other content for toggling -->\r\n            <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\r\n                <ul class=\"nav navbar-nav\">\r\n                    <li class=\"${ route.isActive ? 'active' : ''\" repeat.for=\"route of innerRouter.navigation\">\r\n                        <a href.bind=\"route.href\"> \r\n                            ${route.title}\r\n                        </a>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </nav>\r\n\r\n</template>\r\n\r\n"; });
//# sourceMappingURL=app-bundle.js.map