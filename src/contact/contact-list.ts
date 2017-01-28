
import { DialogService } from 'aurelia-dialog';

import { WebAPI } from '../assets/web-api';
import { autoinject } from 'aurelia-framework';
import { ContactSaved, ContactViewed } from '../messages/messages';
import { EventAggregator } from 'aurelia-event-aggregator';

import { DeleteContactDialog } from '../dialogs/contacts/delete-contact';




@autoinject
export class ContactList {


    private selectedId: number;

    private contacts;


    constructor(private api: WebAPI, ea: EventAggregator, private dService: DialogService) {

        ea.subscribe(ContactViewed, msg => { this.select(msg.contact); });

        ea.subscribe(ContactSaved, msg => {

            let found = this.contacts.find(x => x.id === msg.contact.id);

            Object.assign(found, msg.contact);

        });

    }


    activate() {
        return this.api.getContactList().then(contacts => { this.contacts = contacts; })
    }

    select(contact) {
        this.selectedId = contact.id;
        return true;
    }


    deleteContact(contact, index) {
        this.dService.open({
            viewModel: DeleteContactDialog,
            model:
            {
                contact: contact,
                confirm: {
                    message: 'Are you sure?',
                    title: 'Remove Contact'
                }
            }
        }).then(result => {
            if (result.wasCancelled) return;
            this.api.removeContact(contact.id)
                .then(hasdeleted => {
                    if (hasdeleted) {
                        this.contacts.splice(index, 1);
                    }
                });
        });

    }
}