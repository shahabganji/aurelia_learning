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
                { route: ["contacts"], moduleId: "contact/route-handlers/contact-router", nav: true, title: 'Contacts' },
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

define('contact/new-contact',["require", "exports"], function (require, exports) {
    "use strict";
    var NewContact = (function () {
        function NewContact() {
        }
        return NewContact;
    }());
    exports.NewContact = NewContact;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
        config.globalResources(['./elements/loading-indicator', './elements/tab-panel-pills.html']);
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

define('contact/route-handlers/main',["require", "exports"], function (require, exports) {
    "use strict";
    var Main = (function () {
        function Main() {
        }
        Main.prototype.configureRouter = function (config, router) {
            this.router = router;
            config.map([
                { route: '', title: 'New Contact', moduleId: '../new-contact', nav: true }
            ]);
        };
        return Main;
    }());
    exports.Main = Main;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/loading-indicator',["require", "exports", 'nprogress', 'aurelia-framework'], function (require, exports, nprogress, aurelia_framework_1) {
    "use strict";
    var LoadingIndicator = (function () {
        function LoadingIndicator() {
            this.loading = false;
        }
        LoadingIndicator.prototype.loadingChanged = function (newValue) {
            if (newValue) {
                nprogress.start();
            }
            else {
                nprogress.done();
            }
        };
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Boolean)
        ], LoadingIndicator.prototype, "loading", void 0);
        LoadingIndicator = __decorate([
            aurelia_framework_1.noView(["nprogress/nprogress.css"]), 
            __metadata('design:paramtypes', [])
        ], LoadingIndicator);
        return LoadingIndicator;
    }());
    exports.LoadingIndicator = LoadingIndicator;
});

define('contact/route-handlers/contact-router',["require", "exports"], function (require, exports) {
    "use strict";
    var Main = (function () {
        function Main() {
        }
        Main.prototype.configureRouter = function (config, router) {
            this.router = router;
            config.map([
                { route: 'new', title: 'New Contact', moduleId: '../new-contact', nav: true },
                { route: '', title: 'Details', moduleId: 'contact/route-handlers/contact-detail-router', nav: true }
            ]);
        };
        return Main;
    }());
    exports.Main = Main;
});

define('contact/route-handlers/contact-detail-router',["require", "exports"], function (require, exports) {
    "use strict";
    var ContactDetailRouter = (function () {
        function ContactDetailRouter() {
        }
        ContactDetailRouter.prototype.configureRouter = function (config, router) {
            this.router = router;
            config.map([
                { route: '', viewPorts: { main: { moduleId: '../contact-list' }, select: { moduleId: '../no-selection' } }, title: 'Select' }
            ]);
        };
        return ContactDetailRouter;
    }());
    exports.ContactDetailRouter = ContactDetailRouter;
});

define('contact/contact-list',["require", "exports"], function (require, exports) {
    "use strict";
    var ContactList = (function () {
        function ContactList() {
            this.message = "Contact List will be shown here";
        }
        return ContactList;
    }());
    exports.ContactList = ContactList;
});

define('contact/no-selection',["require", "exports"], function (require, exports) {
    "use strict";
    var NoSelection = (function () {
        function NoSelection() {
        }
        return NoSelection;
    }());
    exports.NoSelection = NoSelection;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n  <require from=\"alertify/css/alertify.css\"></require>\n  <require from=\"toastr/build/toastr.css\"></require>\n\n\n  <require from=\"./resources/elements/nav-bar.html\"></require>\n\n\n  <loading-indicator loading.bind=\"route.isNavigating\"></loading-indicator>\n\n  <nav-bar inner-router.one-time=\"router\" inverse=\"true\" fixed-position=\"top\"></nav-bar>\n\n\n  <div class=\"container\">\n\n    <router-view>\n\n\n    </router-view>\n\n  </div>\n\n</template>"; });
define('text!contact/new-contact.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n    New contacts will be created here\r\n</template>"; });
define('text!public/about.html', ['module'], function(module) { module.exports = "<template>\r\n    ${message}\r\n</template>\r\n"; });
define('text!public/home.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n    ${message}\r\n\r\n</template>"; });
define('text!resources/elements/nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"innerRouter, inverse, fixedPosition\">\r\n\r\n    <nav class=\"navbar ${ inverse ? 'navbar-inverse' : 'navbar-default'} ${ fixedPosition === 'top'  ? 'navbar-static-top' : 'navbar-fixed-bottom'}\">\r\n        <div class=\"container-fluid\">\r\n            <!-- Brand and toggle get grouped for better mobile display -->\r\n            <div class=\"navbar-header\">\r\n                <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\"\r\n                    aria-expanded=\"false\">\r\n                        <span class=\"sr-only\">Toggle navigation</span>\r\n                        <span class=\"icon-bar\"></span>\r\n                        <span class=\"icon-bar\"></span>\r\n                        <span class=\"icon-bar\"></span>\r\n                </button>\r\n                <!--<a class=\"navbar-brand\" href=\"#\"></a>-->\r\n            </div>\r\n\r\n            <!-- Collect the nav links, forms, and other content for toggling -->\r\n            <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\r\n                <ul class=\"nav navbar-nav\">\r\n                    <li class=\"${ route.isActive ? 'active' : ''\" repeat.for=\"route of innerRouter.navigation\">\r\n                        <a href.bind=\"route.href\"> \r\n                            ${route.title}\r\n                        </a>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </nav>\r\n\r\n</template>\r\n\r\n"; });
define('text!contact/route-handlers/main.html', ['module'], function(module) { module.exports = "\r\n<template>\r\n\r\n\r\n\r\n    <router-view></router-view>\r\n\r\n</template>"; });
define('text!resources/elements/tab-panel.html', ['module'], function(module) { module.exports = "<template bindable=\"tabRouter\" >\r\n\r\n    <ul class=\"nav nav-pills nav-stacked\">\r\n        <li role=\"presentation\" class=\"${route.isActive ? 'active' : ''}\" repeat.for=\"route of tabRouter.navigation\">\r\n            <a href.bind=\"route.href\">\r\n                ${route.title}</a>\r\n        </li>\r\n    </ul>\r\n\r\n\r\n\r\n</template>"; });
define('text!contact/route-handlers/contact-router.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n\r\n    <tab-panel-pills tab-router.bind=\"router\" class=\"col-sm-2\">\r\n\r\n    </tab-panel-pills>\r\n\r\n    <router-view class=\"col-sm-7\"></router-view>\r\n\r\n\r\n</template>"; });
define('text!resources/elements/tab-panel-pills.html', ['module'], function(module) { module.exports = "<template bindable=\"tabRouter\" >\r\n\r\n    <ul class=\"nav nav-pills nav-stacked\">\r\n        <li role=\"presentation\" class=\"${route.isActive ? 'active' : ''}\" repeat.for=\"route of tabRouter.navigation\">\r\n            <a href.bind=\"route.href\">\r\n                ${route.title}</a>\r\n        </li>\r\n    </ul>\r\n\r\n\r\n\r\n</template>"; });
define('text!contact/route-handlers/contact-detail-router.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n\r\n    <router-view name=\"main\" class=\"col-sm-4\"></router-view>\r\n\r\n    <router-view name=\"select\" class=\"col-sm-8\"></router-view>\r\n\r\n\r\n</template>"; });
define('text!contact/no-selection.html', ['module'], function(module) { module.exports = "\r\n\r\n<template>\r\n\r\n    <h3>Please select a contact</h3>\r\n\r\n</template>"; });
define('text!contact/contact-list.html', ['module'], function(module) { module.exports = "<template>\r\n    ${message}\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map