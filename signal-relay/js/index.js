import {effect, computed} from 'preact-signal';
import {state, combined} from "shared-state";
import {inputRelay} from "inputRelay";
import {set, fetch, remove} from "store";
import {log} from "enactors";

inputRelay();

effect(() => {
    set('signal-test', JSON.stringify(combined.value));
});

log("combined", combined);

