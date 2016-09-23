

import { inject } from 'aurelia-framework';
import { WebAPI, IContact } from '../assets/web-api';
import { Notification } from '../helpers/notification';

import { NewInstance } from 'aurelia-dependency-injection';
import { ValidationRules, ValidationController } from 'aurelia-validation';

import {MyBootstrapRenderer} from '../validation-renderers/my-bootstrap-renderer';


@inject(WebAPI, Notification, NewInstance.of(ValidationController))
export class NewContact {

    private api: WebAPI;

    private contact: IContact = {
        id: 0,
        firstName: '', lastName: '', email: '',
        nationality: null, rate: null, gender: null, phoneNumber: ''
    };
    private countries;

    private hasFocus = true;

    constructor(api: WebAPI, private notify: Notification, private validator: ValidationController) {
        this.api = api;

        ValidationRules
            .ensure((c: IContact) => c.firstName).displayName("First Name").required().withMessage("Please enter ${$displayName}")
            .ensure((c: IContact) => c.lastName).required().withMessage("Please enter ${$displayName}")
            .ensure((c: IContact) => c.rate).required().when(x => x.email.trim().length > 0).withMessage("You should rate when you have email")
            .ensure((c: IContact) => c.email).email().when(x => x.email.trim().length > 0).withMessage("Enter email in a correct format")
            .on(this.contact);

        this.validator.addRenderer(new MyBootstrapRenderer());
    }

    activate() {
        return this.api.getCountryList().then(countries => {

            this.countries = countries;
        });
    }

    bind() {
        this.hasFocus = true;
    }


    addNewContact() {

        this.validator.validate().then(errors => {

            console.warn(`You have ${errors.length} error(s).`);

            if (errors.length === 0) {
                return this.api.saveContact(this.contact).then(x => {
                    this.hasFocus = true;
                    this.notify.success("Contact saved successfully");
                    this.contact = {
                        id: 0,
                        firstName: '', lastName: '', email: '',
                        nationality: null, rate: null, gender: null, phoneNumber: ''
                    };
                });
            }
            else {
                return this.notify.error();
            }
        })

    }
}