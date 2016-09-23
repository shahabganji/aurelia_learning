

import { inject } from 'aurelia-framework';
import { WebAPI } from '../assets/web-api';
import { Notification } from '../helpers/notification';


@inject(WebAPI, Notification)
export class NewContact {

    private api: WebAPI;

    private contact;
    private countries;

    private hasFocus = true;

    constructor(api: WebAPI, private notify: Notification) {
        this.api = api;
    }

    activate() {
        return this.api.getCountryList().then(countries => {

            this.countries = countries;
        });
    }

    bind(){
        this.hasFocus = true;
    }


    addNewContact() {

        return this.api.saveContact(this.contact).then(x => {

            this.hasFocus = true;
            this.notify.success("Contact saved successfully");
            this.contact = null;

        });
    }
}