

import { ValidationError, RenderInstruction } from 'aurelia-validation';

export class MyBootstrapRenderer {

    render(instruction: RenderInstruction) {

        console.info( "at the render function" );

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
        console.info("add");
    
        element.parentElement.classList.add("has-error");
    }

    private remove(error: ValidationError, element: Element) {
        console.info("remove");
        element.parentElement.classList.remove("has-error");
    }

}