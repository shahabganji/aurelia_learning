

import { ValidationError, RenderInstruction } from 'aurelia-validation';

export class MyBootstrapRenderer {

    render(instruction: RenderInstruction) {

        for (let {error, elements} of instruction.unrender) {

            for (let element of elements) {
                this.remove(error, element);
            }

        }


        for (let {error, elements} of instruction.render) {

            for (let element of elements) {
                this.add(error, element);
            }

        }

    }


    private add(error: ValidationError, element: Element) {
        element.parentElement.classList.add("has-error");
    }

    private remove(error: ValidationError, element: Element) {
        element.parentElement.classList.remove("has-error");
    }

}