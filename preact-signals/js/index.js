import { htm, h, effect, render } from 'preact-signal';
import {createAppState} from "./shared-state.js";
import {Counter} from "./adjuster.js";
import {Output} from "./enactor.js";
import {set, fetch, remove} from "./store.js";

// Initialize htm with Preact
const html = htm.bind(h);

const state = createAppState(fetch('signal-test') ?? 0);
effect(() => set('signal-test', state.value));

function App(props) {
    return html`
    <div>
        <${Counter} state=${state} name="counter" id="counter" />
        <div>
            <h2>Results</h2>
            <${Output} state=${state} />
        </div>
    </div>
    `;
}

render(html`<${App} />`, document.getElementById("main"));
