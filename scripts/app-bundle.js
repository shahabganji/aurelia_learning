define('assets/web-api',["require", "exports"], function (require, exports) {
    "use strict";
    var latency = 200;
    var id = 0;
    function getId() {
        return ++id;
    }
    var nations = [
        { id: 1, name: 'Iran', abbr: 'ir' },
        { id: 2, name: 'Australia', abbr: 'au' },
        { id: 3, name: 'Canada', abbr: 'ca' },
        { id: 4, name: 'United States', abbr: 'us' }
    ];
    var contacts = [
        {
            id: getId(),
            firstName: 'John',
            lastName: 'Tolkien',
            email: 'tolkien@inklings.com',
            phoneNumber: '867-5309',
            nationality: 1,
            rate: 5,
            gender: 'Male'
        },
        {
            id: getId(),
            firstName: 'Clive',
            lastName: 'Lewis',
            email: 'lewis@inklings.com',
            phoneNumber: '867-5309',
            nationality: 2,
            rate: 4,
            gender: 'Male'
        },
        {
            id: getId(),
            firstName: 'Owen',
            lastName: 'Barfield',
            email: 'barfield@inklings.com',
            phoneNumber: '867-5309',
            nationality: 3,
            rate: 4,
            gender: 'Male'
        },
        {
            id: getId(),
            firstName: 'Charles',
            lastName: 'Williams',
            email: 'williams@inklings.com',
            phoneNumber: '867-5309',
            nationality: 4,
            rate: 3,
            gender: 'Male'
        },
        {
            id: getId(),
            firstName: 'Roger',
            lastName: 'Green',
            email: 'green@inklings.com',
            phoneNumber: '867-5309',
            nationality: 2,
            rate: 5,
            gender: 'Male'
        }
    ];
    var WebAPI = (function () {
        function WebAPI() {
            this.isRequesting = false;
        }
        WebAPI.prototype.getContactList = function () {
            var _this = this;
            this.isRequesting = true;
            return new Promise(function (resolve) {
                setTimeout(function () {
                    var results = contacts.map(function (x) {
                        return {
                            id: x.id,
                            firstName: x.firstName,
                            lastName: x.lastName,
                            email: x.email, nationality: x.nationality, rate: x.rate, gender: x.gender
                        };
                    });
                    resolve(results);
                    _this.isRequesting = false;
                }, latency);
            });
        };
        WebAPI.prototype.getCountryList = function () {
            var _this = this;
            this.isRequesting = true;
            return new Promise(function (resolve) {
                setTimeout(function () {
                    var results = nations.map(function (x) {
                        return {
                            id: x.id,
                            name: x.name,
                            abbr: x.abbr
                        };
                    });
                    resolve(results);
                    _this.isRequesting = false;
                }, latency);
            });
        };
        WebAPI.prototype.getContactDetails = function (id) {
            var _this = this;
            this.isRequesting = true;
            return new Promise(function (resolve) {
                setTimeout(function () {
                    var found = contacts.filter(function (x) { return x.id == id; })[0];
                    resolve(JSON.parse(JSON.stringify(found)));
                    _this.isRequesting = false;
                }, latency);
            });
        };
        WebAPI.prototype.saveContact = function (contact) {
            var _this = this;
            this.isRequesting = true;
            return new Promise(function (resolve) {
                setTimeout(function () {
                    var instance = JSON.parse(JSON.stringify(contact));
                    var found = contacts.filter(function (x) { return x.id == contact.id; })[0];
                    if (found) {
                        var index = contacts.indexOf(found);
                        contacts[index] = instance;
                    }
                    else {
                        instance.id = getId();
                        contacts.push(instance);
                    }
                    _this.isRequesting = false;
                    resolve(instance);
                }, latency);
            });
        };
        return WebAPI;
    }());
    exports.WebAPI = WebAPI;
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
define('app',["require", "exports", './assets/web-api', 'aurelia-framework', 'toastr'], function (require, exports, web_api_1, aurelia_framework_1, toastr) {
    "use strict";
    var App = (function () {
        function App(api) {
            this.api = api;
            toastr.options.positionClass = "toast-bottom-left";
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
        App = __decorate([
            aurelia_framework_1.autoinject, 
            __metadata('design:paramtypes', [web_api_1.WebAPI])
        ], App);
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
            .feature('resources')
            .feature('assets');
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

define('assets/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
        config.globalResources([]);
    }
    exports.configure = configure;
});

define('assets/utility',["require", "exports"], function (require, exports) {
    "use strict";
    function areEqual(obj1, obj2) {
        return Object.keys(obj1).every(function (key) { return obj2.hasOwnProperty(key) && (obj1[key] === obj2[key]); });
    }
    exports.areEqual = areEqual;
    ;
});

define('helpers/notification',["require", "exports", 'alertify', 'toastr'], function (require, exports, alertify, toastr) {
    "use strict";
    var Notification = (function () {
        function Notification() {
        }
        Notification.prototype.confirm = function (message) {
            return new Promise(function (resolve) {
                alertify.confirm(message, function () { resolve(true); }, function () { resolve(false); });
            });
        };
        Notification.prototype.success = function (message) {
            return new Promise(function (resolve) {
                toastr.clear();
                toastr.success(message);
            });
        };
        return Notification;
    }());
    exports.Notification = Notification;
});

define('messages/messages',["require", "exports"], function (require, exports) {
    "use strict";
    var ContactViewed = (function () {
        function ContactViewed(contact) {
            this.contact = contact;
        }
        return ContactViewed;
    }());
    exports.ContactViewed = ContactViewed;
    var ContactSaved = (function () {
        function ContactSaved(contact) {
            this.contact = contact;
        }
        return ContactSaved;
    }());
    exports.ContactSaved = ContactSaved;
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
define('contact/contact-detail',["require", "exports", '../assets/web-api', 'aurelia-framework', '../helpers/notification', '../assets/utility', 'aurelia-event-aggregator', '../messages/messages'], function (require, exports, web_api_1, aurelia_framework_1, notification_1, utility_1, aurelia_event_aggregator_1, messages_1) {
    "use strict";
    var ContactDetail = (function () {
        function ContactDetail(api, notify, ea) {
            this.notify = notify;
            this.ea = ea;
            this.api = api;
        }
        ContactDetail.prototype.activate = function (params, routeConfig, $navigationInstruction) {
            var _this = this;
            this.routeConfig = routeConfig;
            this.api.getCountryList().then(function (countries) { _this.countries = countries; });
            return this.api.getContactDetails(params.id).then(function (contact) {
                _this.contact = contact;
                _this.originalContact = JSON.parse(JSON.stringify(contact));
                _this.routeConfig.navModel.setTitle(_this.contact.firstName);
                _this.ea.publish(new messages_1.ContactViewed(contact));
            });
        };
        ContactDetail.prototype.save = function () {
            var _this = this;
            return this.api.saveContact(this.contact).then(function (x) {
                _this.ea.publish(new messages_1.ContactSaved(_this.contact));
                _this.notify.success("Contact saved successfully");
            });
        };
        ContactDetail.prototype.canDeactivate = function () {
            return __awaiter(this, void 0, void 0, function* () {
                if (!utility_1.areEqual(this.contact, this.originalContact)) {
                    var result = yield this.notify.confirm("you have unsaved changes, are you sure you want to leave this page?");
                    if (!result) {
                        this.ea.publish(new messages_1.ContactViewed(this.contact));
                    }
                    return result;
                }
                return true;
            });
        };
        ContactDetail = __decorate([
            aurelia_framework_1.autoinject, 
            __metadata('design:paramtypes', [web_api_1.WebAPI, notification_1.Notification, aurelia_event_aggregator_1.EventAggregator])
        ], ContactDetail);
        return ContactDetail;
    }());
    exports.ContactDetail = ContactDetail;
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
define('contact/contact-list',["require", "exports", '../assets/web-api', 'aurelia-framework', '../messages/messages', 'aurelia-event-aggregator'], function (require, exports, web_api_1, aurelia_framework_1, messages_1, aurelia_event_aggregator_1) {
    "use strict";
    var ContactList = (function () {
        function ContactList(api, ea) {
            var _this = this;
            this.api = api;
            ea.subscribe(messages_1.ContactViewed, function (msg) { _this.select(msg.contact); });
            ea.subscribe(messages_1.ContactSaved, function (msg) {
                var found = _this.contacts.find(function (x) { return x.id === msg.contact.id; });
                Object.assign(found, msg.contact);
            });
        }
        ContactList.prototype.activate = function () {
            var _this = this;
            return this.api.getContactList().then(function (contacts) { _this.contacts = contacts; });
        };
        ContactList.prototype.select = function (contact) {
            this.selectedId = contact.id;
            return true;
        };
        ContactList = __decorate([
            aurelia_framework_1.autoinject, 
            __metadata('design:paramtypes', [web_api_1.WebAPI, aurelia_event_aggregator_1.EventAggregator])
        ], ContactList);
        return ContactList;
    }());
    exports.ContactList = ContactList;
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

define('contact/no-selection',["require", "exports"], function (require, exports) {
    "use strict";
    var NoSelection = (function () {
        function NoSelection() {
        }
        return NoSelection;
    }());
    exports.NoSelection = NoSelection;
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
        config.globalResources(['./elements/loading-indicator', './elements/tab-panel-pills.html']);
    }
    exports.configure = configure;
});

define('contact/route-handlers/contact-detail-router',["require", "exports"], function (require, exports) {
    "use strict";
    var ContactDetailRouter = (function () {
        function ContactDetailRouter() {
        }
        ContactDetailRouter.prototype.configureRouter = function (config, router) {
            this.router = router;
            config.map([
                { route: '', viewPorts: { main: { moduleId: '../contact-list' }, select: { moduleId: '../no-selection' } }, title: 'Select' },
                { route: ':id', viewPorts: { main: { moduleId: '../contact-list' }, select: { moduleId: '../contact-detail' } }, name: 'contact-details' }
            ]);
        };
        return ContactDetailRouter;
    }());
    exports.ContactDetailRouter = ContactDetailRouter;
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
                { route: 'details', title: 'Details', moduleId: 'contact/route-handlers/contact-detail-router', nav: true },
                { route: '', redirect: 'new' }
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

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n  <require from=\"alertify/css/alertify.css\"></require>\n  <require from=\"toastr/build/toastr.css\"></require>\n\n  <require from=\"./resources/elements/nav-bar.html\"></require>\n\n\n  <loading-indicator loading.bind=\"route.isNavigating || api.isRequesting\"></loading-indicator>\n\n  <nav-bar inner-router.one-time=\"router\" inverse=\"true\" fixed-position=\"top\"></nav-bar>\n\n\n  <div class=\"container\">\n\n    <router-view>\n\n\n    </router-view>\n\n  </div>\n\n</template>"; });
define('text!assets/styles.css', ['module'], function(module) { module.exports = "\n\na:focus {\n  outline: none;\n}\n\n.no-selection {\n  margin: 20px;\n}\n\n.contact-list {\n  overflow-y: auto;\n  border: 1px solid #ddd;\n  padding: 10px;\n}\n\n.panel {\n  margin: 20px;\n}\n\n\nli.list-group-item {\n  list-style: none;\n}\n\nli.list-group-item > a {\n  text-decoration: none;\n}\n\nli.list-group-item.active > a {\n  color: white;\n}\n\n\n#nprogress .bar {\n  background:cÏyan !important;\n  height: 3px !important;\n}"; });
define('text!contact/contact-detail.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n    <div class=\"panel panel-primary\">\r\n\r\n        <div class=\"panel-heading\">\r\n            <h3 class=\"panel-title\">Edit Contact</h3>\r\n        </div>\r\n\r\n        <div class=\"panel-body\">\r\n\r\n            <form>\r\n                <div class=\"form-group\">\r\n                    <label for=\"FirstName\">FirstName</label>\r\n                    <input type=\"text\" class=\"form-control\" id=\"FirstName\" placeholder=\"FirstName\" value.bind=\"contact.firstName\">\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"LastName\">LastName</label>\r\n                    <input type=\"text\" class=\"form-control\" id=\"LastName\" placeholder=\"LastName\" value.bind=\"contact.lastName\">\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"Email\">Email</label>\r\n                    <input type=\"email\" class=\"form-control\" id=\"Email\" placeholder=\"Email\" value.bind=\"contact.email\">\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"Nationality\">Nationality</label>\r\n                    <Select type=\"email\" class=\"form-control\" id=\"Nationality\" placeholder=\"Nationality\" value.bind=\"contact.nationality\">\r\n                        <option model.bind=\"null\">Please select your nationality</option>\r\n                        <option repeat.for=\"country of countries\"\r\n                        model.bind=\"country.id\"\r\n                        > ${country.abbr} - ${country.name}</option>\r\n                    </Select>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <div class=\"checkbox\">\r\n                        <label style=\"padding-right:5px;margin-right:5px;border-right:1px solid black;\">\r\n                            <input type=\"radio\" name=\"Gender\" value=\"Male\" checked.bind=\"contact.gender\"> Male\r\n                        </label>\r\n                        <label>\r\n                            <input type=\"radio\" name=\"Gender\" value=\"Female\"  checked.bind=\"contact.gender\" > Female\r\n                        </label>\r\n                    </div>\r\n                </div>\r\n                <button type=\"submit\" class=\"btn btn-success pull-right\" click.delegate=\"save()\">Save</button>\r\n            </form>\r\n\r\n        </div>\r\n    </div>\r\n\r\n\r\n</template>"; });
define('text!contact/contact-list.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n\r\n    <ul class=\"list-group\">\r\n        <li repeat.for=\"contact of contacts\" class=\"list-group-item ${contact.id === $parent.selectedId ? 'active' : ''}\">\r\n            <span class=\"badge\">${contact.rate}</span>\r\n            <a route-href=\"route: contact-details; params.bind: {id:contact.id}\" click.delegate=\"$parent.select(contact)\">\r\n                <h4 class=\"list-group-item-heading\">${contact.firstName} ${contact.lastName}</h4>\r\n                <p class=\"list-group-item-text\">${contact.email}</p>\r\n            </a>\r\n        </li>\r\n    </ul>\r\n\r\n\r\n\r\n</template>"; });
define('text!contact/new-contact.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n    New contacts will be created here\r\n</template>"; });
define('text!contact/no-selection.html', ['module'], function(module) { module.exports = "\r\n\r\n<template>\r\n\r\n    <h3>Please select a contact</h3>\r\n\r\n</template>"; });
define('text!public/about.html', ['module'], function(module) { module.exports = "<template>\r\n    ${message}\r\n</template>\r\n"; });
define('text!public/home.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n    ${message}\r\n\r\n</template>"; });
define('text!contact/route-handlers/contact-detail-router.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n\r\n    <router-view name=\"main\" class=\"col-sm-4\"></router-view>\r\n\r\n    <router-view name=\"select\" class=\"col-sm-8\"></router-view>\r\n\r\n\r\n</template>"; });
define('text!contact/route-handlers/contact-router.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n\r\n    <tab-panel-pills tab-router.bind=\"router\" class=\"col-sm-2\">\r\n\r\n    </tab-panel-pills>\r\n\r\n    <router-view class=\"col-sm-10\"></router-view>\r\n\r\n\r\n</template>"; });
define('text!resources/elements/nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"innerRouter, inverse, fixedPosition\">\r\n\r\n    <nav class=\"navbar ${ inverse ? 'navbar-inverse' : 'navbar-default'} ${ fixedPosition === 'top'  ? 'navbar-static-top' : 'navbar-fixed-bottom'}\">\r\n        <div class=\"container-fluid\">\r\n            <!-- Brand and toggle get grouped for better mobile display -->\r\n            <div class=\"navbar-header\">\r\n                <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\"\r\n                    aria-expanded=\"false\">\r\n                        <span class=\"sr-only\">Toggle navigation</span>\r\n                        <span class=\"icon-bar\"></span>\r\n                        <span class=\"icon-bar\"></span>\r\n                        <span class=\"icon-bar\"></span>\r\n                </button>\r\n                <!--<a class=\"navbar-brand\" href=\"#\"></a>-->\r\n            </div>\r\n\r\n            <!-- Collect the nav links, forms, and other content for toggling -->\r\n            <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\r\n                <ul class=\"nav navbar-nav\">\r\n                    <li class=\"${ route.isActive ? 'active' : ''\" repeat.for=\"route of innerRouter.navigation\">\r\n                        <a href.bind=\"route.href\"> \r\n                            ${route.title}\r\n                        </a>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </nav>\r\n\r\n</template>\r\n\r\n"; });
define('text!resources/elements/tab-panel-pills.html', ['module'], function(module) { module.exports = "<template bindable=\"tabRouter\" >\r\n\r\n    <ul class=\"nav nav-pills nav-stacked\">\r\n        <li role=\"presentation\" class=\"${route.isActive ? 'active' : ''}\" repeat.for=\"route of tabRouter.navigation\">\r\n            <a href.bind=\"route.href\">\r\n                ${route.title}</a>\r\n        </li>\r\n    </ul>\r\n\r\n\r\n\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map