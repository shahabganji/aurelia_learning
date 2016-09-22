
import { WebAPI } from '../assets/web-api';
import { autoinject } from 'aurelia-framework';
import { ContactSaved, ContactViewed } from '../messages/messages';
import { EventAggregator } from 'aurelia-event-aggregator';


@autoinject
export class ContactList {


    private selectedId: number;

    private contacts;


    constructor(private api: WebAPI, ea: EventAggregator) {

        ea.subscribe(ContactViewed, msg => { this.select(msg.contact); });

        ea.subscribe( ContactSaved , msg=>{

            let found = this.contacts.find( x=> x.id === msg.contact.id );

            Object.assign(found , msg.contact);

        } );

    }


    activate() {
        return this.api.getContactList().then(contacts => { this.contacts = contacts; })
    }

    select(contact) {
        this.selectedId = contact.id;
        return true;
    }
}