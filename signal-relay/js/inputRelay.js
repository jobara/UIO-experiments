import {signal, effect} from 'preact-signal';
import {state} from "shared-state";

const addInput = function () {};

const removeInput = function () {};

function inputRelay(options) {
    const effects = {};

    const opt = {
        "container": "body",
        "input": "[data-input-relay]",
        "path": "data-input-relay-path",
        ...options
    }

    const container = document.querySelector(opt.container);
    let inputs = container.querySelectorAll(opt.input);

    inputs.forEach(input => {
        let path = input.getAttribute(opt.path) || input.getAttribute("name");
        let inputSignal;

        if (state.value[path]) {
            inputSignal = state.value[path];
            input.value = inputSignal.value;
        } else {
            inputSignal = state.value[path] = signal(input.value);
        }

        effects[path] = effect(() => {
            input.value = inputSignal.value;
        });

        input.addEventListener("change", (event) => {
            inputSignal.value = event.target.value;
        });
    });
}

export {inputRelay};
