import {signal} from 'preact-signal';

function createAppState(initialState) {
    const state = signal(initialState);

    return state;
}

export { createAppState };
