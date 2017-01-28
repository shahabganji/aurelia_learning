import { DialogController } from 'aurelia-dialog';
import { autoinject } from 'aurelia-dependency-injection';



@autoinject
export class DeleteContactDialog {


    private contact;
    private confirmationMessage: string;
    private confirmationTitle: string;

    constructor(private controller: DialogController) {
    }


    activate(model) {
        this.contact = model.contact;
        this.confirmationMessage = model.confirm.message;
        this.confirmationTitle = model.confirm.title;
    }

    yes(): void {
        this.controller.ok(this.contact);
    }

    no(): void {
        this.controller.cancel()
    }





}