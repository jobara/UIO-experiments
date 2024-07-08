import {signal, effect} from 'preact-signal';
import {state} from "shared-state";

const removeFromState = function (state, path) {
    if (state.value === undefined) {
        return state;
    }

    const updated = {...state.value};
    delete updated[path];

    return updated;
};

const updateInputs = function (records, options) {
    const opt = {
        "input": "[data-input-relay]",
        "path": "data-input-relay-path",
        ...options
    };

    records.forEach((record) => {
        record.addedNodes.forEach((node) => {
            if (node.hasAttribute(opt.input)) {
                addInput(node, opt)
            } else {
                const inputs = node.querySelectorAll(`[${opt.input}]`);
                inputs.forEach(input => addInput(input, opt));
            }
        });
    });
};

const addInput = function (input, options) {
    const opt = {
        "path": "data-input-relay-path",
        ...options
    };

    const path = input.getAttribute(opt.path) || input.getAttribute("name");

    const inputSignal = state.value[path] || signal(input.value);
    state.value = {...state.value, [path]: inputSignal};

    effect(() => {
        input.value = inputSignal.value;
    });

    input.addEventListener("change", (event) => {
        inputSignal.value = event.target.value;
    });
};

const removeInput = function () {};

function inputRelay(options) {
    const opt = {
        "container": "body",
        "input": "data-input-relay",
        "path": "data-input-relay-path",
        ...options
    };

    const container = document.querySelector(opt.container);
    const inputs = container.querySelectorAll(`[${opt.input}]`);

    inputs.forEach(input => addInput(input, opt));

    const observer = new MutationObserver(records => updateInputs(records, opt));
    observer.observe(container, {
        childList: true,
        subtree: true
    });
}

export {inputRelay};
