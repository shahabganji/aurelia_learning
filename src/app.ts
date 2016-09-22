
import { RouterConfiguration, Router } from 'aurelia-router';

export class App {


  private router: Router;


  configureRouter(config: RouterConfiguration, router: Router) {

    this.router = router;


    config.mapUnknownRoutes("not-found");

    config.map([
      { route: [''], moduleId: "public/home", name: 'home', nav: true },
      { route: ["about"], moduleId: "public/about", name: 'about', nav: true },
      // { route: ["contacts"], moduleId: "contact/contact-route-handler", nav: true },
      {route: "home", redirect: '' }
    ]);
  }
}