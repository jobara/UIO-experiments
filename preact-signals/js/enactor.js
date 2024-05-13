import {htm, h, useSignal, render} from 'preact-signal';

// Initialize htm with Preact
const html = htm.bind(h);

function Output(props) {
    const result = props.state ?? useSignal(0);

    return html`<strong>${result}</strong>`;
}

export { Output };
