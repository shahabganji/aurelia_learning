
import { RouterConfiguration, Router } from 'aurelia-router';

export class ContactDetailRouter {

    private router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {

        this.router = router;

        config.map([

            { route: '', viewPorts: { main: { moduleId: '../contact-list' }, select: { moduleId: '../no-selection' } }, title: 'Select' },
            { route: ':id', viewPorts: { main: { moduleId: '../contact-list' }, select: { moduleId: '../contact-detail' } } , name : 'contact-details' }
        ]);

    }
}