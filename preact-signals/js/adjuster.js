import {htm, h, useSignal} from 'preact-signal';

// Initialize htm with Preact
const html = htm.bind(h);

function Counter(props) {
    const count = props.state ?? useSignal(0);

    const onInput = event => (count.value = event.currentTarget.value);

    return html`
        <div>
            <label for=${props.id}>${props.label}</label>
            <input type="number" id=${props.id} name=${props.name} min=${props.min ?? 0} max=${props.max ?? 100} value=${count} onInput=${onInput} />
        </div>
    `;
}

export { Counter };
