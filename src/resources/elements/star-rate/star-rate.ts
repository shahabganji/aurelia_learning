

import { bindable, bindingMode } from 'aurelia-framework';

export class StarRate {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) rate: Number;
    @bindable maxRate: number;
    @bindable readOnly: boolean = true;
    @bindable color:string = 'Black';


    private mouseRate = -1;

    mouseEnter(value) {

        if (this.readOnly) {
            return;
        }

        if (value > this.maxRate) {
            this.mouseRate = this.maxRate;
        }
        else {
            this.mouseRate = value + 1;
        }
    }

    setRate(value) {

        if (this.readOnly) {
            return;
        }
        this.rate = value + 1;
    }

    mouseLeft() {
        if (this.readOnly) {
            return;
        }
        this.mouseRate = -1;
    }


}