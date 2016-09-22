
import { RouterConfiguration, Router } from 'aurelia-router';

import { WebAPI } from './assets/web-api';
import { autoinject } from 'aurelia-framework';


@autoinject
export class App {


  private router: Router;
  private api: WebAPI;

  constructor(api: WebAPI) {
    this.api = api;

  }


  configureRouter(config: RouterConfiguration, router: Router) {

    this.router = router;


    config.mapUnknownRoutes("not-found");

    config.title = "Contacts";

    config.map([
      { route: [''], moduleId: "public/home", name: 'home', nav: true, title: 'Home' },
      { route: ["about"], moduleId: "public/about", name: 'about', nav: true, title: 'About' },
      { route: ["contacts"], moduleId: "contact/route-handlers/contact-router", nav: true, title: 'Contacts' },
      { route: "home", redirect: '' }
    ]);
  }
}