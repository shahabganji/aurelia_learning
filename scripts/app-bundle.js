define('app',["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App() {
        }
        App.prototype.configureRouter = function (config, router) {
            this.router = router;
            config.mapUnknownRoutes("not-found");
            config.map([
                { route: [''], moduleId: "public/home", name: 'home', nav: true },
                { route: ["about"], moduleId: "public/about", name: 'about', nav: true },
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

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n  <require from=\"alertify/css/alertify.css\"></require>\n  <require from=\"toastr/build/toastr.css\"></require>\n\n\n\n  \n\n  <div class=\"container\">\n\n    <router-view></router-view>\n\n  </div>\n\n\n\n\n\n</template>"; });
define('text!public/about.html', ['module'], function(module) { module.exports = "<template>\r\n    ${message}\r\n</template>\r\n"; });
define('text!public/home.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n    ${message}\r\n\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map