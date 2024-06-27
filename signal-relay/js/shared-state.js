import {signal, computed} from 'preact-signal';
import {set, fetch, remove} from "store";

const fetched = await fetch('signal-test');
const fetchedJSON = JSON.parse(fetched) || {};
const initial = {};

for (let key in fetchedJSON) {
    initial[key] = signal(fetchedJSON[key]);
}

const state = signal(initial);
const combined = computed(() => {
    const deref = {};

    for (let key in state.value) {
        deref[key] = state.value[key].value;
    }

    return deref;
});

window.state = state;
window.combined = combined;

export { state, combined };

// this is exposed on the window object to put it into the global context there.
// should also be importable into other modules and maintain live bindings there too.
