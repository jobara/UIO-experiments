import {signal, effect} from 'preact-signal';
import {state} from "shared-state";

const inputMap = new Map();
const signalMap = new Map();

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
        record.removedNodes.forEach((node) => {
            if (node.hasAttribute(opt.input)) {
                removeInput(node, opt)
            } else {
                const inputs = node.querySelectorAll(`[${opt.input}]`);
                inputs.forEach(input => removeInput(input, opt));
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

    if (!inputMap.has(input)) {
        inputMap.set(input, effect(() => {
            input.value = inputSignal.value;
        }));

        if (!signalMap.has(inputSignal)) {
            signalMap.set(inputSignal, new Set([input]));
        } else {
            signalMap.get(inputSignal).add(input);
        }
    }

    input.addEventListener("change", (event) => {
        inputSignal.value = event.target.value;
    });
};

const removeInput = function (input, options) {
    const opt = {
        "path": "data-input-relay-path",
        ...options
    };

    const path = input.getAttribute(opt.path) || input.getAttribute("name");

    if (inputMap.has(input)) {
        inputMap.get(input)();
        inputMap.delete(input);
    }

    const inputSignal = state.value[path];

    if (inputSignal && signalMap.has(inputSignal)) {
        signalMap.get(inputSignal).delete(input);

        if (!signalMap.get(inputSignal).size) {
            signalMap.delete(inputSignal);
            // TODO: This should probably be configurable so that we don't remove something from the store that we may want to keep.
            // Removes the path via destructuring by shifting the removed part to a separate variable.
            // see: https://stackoverflow.com/questions/36553129/what-is-the-shortest-way-to-modify-immutable-objects-using-spread-and-destructur/36553130#36553130
            let {[path]: deleted, ...newState} = state.value;
            state.value = newState;
        }
    }
};

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
