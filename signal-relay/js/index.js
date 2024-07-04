import {effect, computed} from 'preact-signal';
import {state, serialized, serializedPretty} from "shared-state";
import {inputRelay} from "inputRelay";
import {set, fetch, remove} from "store";
import {log, render} from "enactors";

effect(() => {
    set('signal-test', serialized.value);
});

inputRelay({
    container: ".relay-panel"
});

log("serialized", serialized);
render(".output", serializedPretty);

