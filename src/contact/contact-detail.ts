

import { WebAPI } from '../assets/web-api';
import { autoinject } from 'aurelia-framework';
import { RouteConfig } from 'aurelia-router';
import { Notification } from '../helpers/notification';
import { areEqual } from '../assets/utility';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ContactSaved, ContactViewed } from '../messages/messages';



@autoinject
export class ContactDetail {

    private api: WebAPI;
    private routeConfig: RouteConfig;


    private contact;
    private originalContact;

    private countries;

    constructor(api: WebAPI, private notify: Notification, private ea: EventAggregator) {
        this.api = api;
    }


    activate(params, routeConfig, $navigationInstruction) {

        this.routeConfig = routeConfig;

        this.api.getCountryList().then(countries => { this.countries = countries; });

        return this.api.getContactDetails(params.id).then(contact => {
            this.contact = contact;
            this.originalContact = JSON.parse(JSON.stringify(contact));
            this.routeConfig.navModel.setTitle(this.contact.firstName);

            this.ea.publish(new ContactViewed(contact));

        });
    }

    get fullName() {
        return `${this.contact.firstName} ${this.contact.lastName}`;
    }


    save() {
        return this.api.saveContact(this.contact).then(x => {
            this.ea.publish(new ContactSaved(this.contact));

            this.originalContact = JSON.parse(JSON.stringify(this.contact));
            this.notify.success("Contact saved successfully");
        });
    }

    async canDeactivate() {

        if (!areEqual(this.contact, this.originalContact)) {
            let result = await this.notify.confirm("you have unsaved changes, are you sure you want to leave this page?");

            if (!result) {
                //  this.routeConfig.navModel.setTitle(this.contact.firstName);
                this.ea.publish(new ContactViewed(this.contact));
            }

            return result;
        }

        return true;

    }

}