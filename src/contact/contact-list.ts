
import { WebAPI } from '../assets/web-api';
import { autoinject } from 'aurelia-framework';


@autoinject
export class ContactList {


    private selectedId:number;

    private contacts;
    private countries;

    constructor(private api: WebAPI) {
    }


    activate() {

        this.api.getCountryList().then(countries => { this.countries = countries; })

        return this.api.getContactList().then( contacts=>{ this.contacts = contacts; } )

    }



    select(contact){
        this.selectedId = contact.id;
        return true;
    }
}