import {signal, effect} from 'preact-signal';

function log(name, state) {
    state = state ?? signal();

    return effect(() => console.log(`${name}: ${typeof state.value === "object" ? JSON.stringify(state.value) : state.value}`));
}

export { log };
