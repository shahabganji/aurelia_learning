
import { RouterConfiguration, Router } from 'aurelia-router';


export class Main {

    private router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {

        this.router = router;

        // #/contacts/
        config.map([
            { route: 'new', title: 'New Contact', moduleId: '../new-contact', nav: true },
            { route: 'details', title: 'Details', moduleId: 'contact/route-handlers/contact-detail-router', nav: true },
            { route: '', redirect: 'new' }
        ]);
    }
}