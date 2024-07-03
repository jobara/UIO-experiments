import {signal, computed} from 'preact-signal';
import {set, fetch, remove} from "store";

const fetched = await fetch('signal-test');
const fetchedJSON = JSON.parse(fetched) || {};
const initial = {};

for (let key in fetchedJSON) {
    initial[key] = signal(fetchedJSON[key]);
}

const state = signal(initial);
const serialized = computed(() => {
    const deref = {};

    for (let key in state.value) {
        deref[key] = state.value[key].value;
    }

    return JSON.stringify(deref);
});

export {state, serialized };
