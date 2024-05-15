'use strict';

(function () {
    class Stepper extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            let input = this.querySelector(".input");
            let max = Number(input.getAttribute("max"));
            let min = Number(input.getAttribute("min"));
            let decrement = this.querySelector(".decrement");
            let increment = this.querySelector(".increment");

            input.addEventListener("change", () => {
                decrement.disabled = Number(input.value) <= min;
                increment.disabled = Number(input.value) >= max;
            });

            decrement.addEventListener("click", () => {input.stepDown(); input.dispatchEvent(new Event('change'));});
            increment.addEventListener("click", () => {input.stepUp(); input.dispatchEvent(new Event('change'));});
        }

        /*
            connectedCallback(): called each time the element is added to the document.The specification recommends that, as far as possible, developers should implement custom element setup in this callback rather than the constructor.
            disconnectedCallback(): called each time the element is removed from the document.
            adoptedCallback(): called each time the element is moved to a new document.
            attributeChangedCallback()
        */
    }

    // let the browser know about the custom element
    customElements.define('input-number-stepper', Stepper);
})();
