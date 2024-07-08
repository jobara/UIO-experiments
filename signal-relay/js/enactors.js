import {signal, effect} from 'preact-signal';

function log(name, state) {
    state = state ?? signal();

    return effect(() => console.log(`${name}: ${typeof state.value === "object" ? JSON.stringify(state.value) : state.value}`));
}

function render(selector, state) {
    const node = document.querySelector(selector);

    return effect(() => node.textContent = state.value);
}

export { log, render };
